const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://alternate-days-of-cp-eabcd-default-rtdb.firebaseio.com"
});
const db = admin.firestore();

// const CONTEST_START_TIME = <set time here>

function calc_rating(status,rtime,memory,stime){
    if(status == "OK"){
        return (stime - 10)+ rtime
    }
    else{
        return 0;
    }
}

function calcScores(){
    db.collection('temp_contest').get().then(docs=>{
        let dateObj = new Date()
        const offset = dateObj.getTimezoneOffset()
        dateObj = new Date(dateObj.getTime() - (offset*60*1000))
        let date = dateObj.toISOString().split('T')[0]
        console.log("Date: ",date)
        for(let doc of docs.docs){
            let userid = doc.id
            let contest_rating = 0, question_rating
            let questions = []
            doc.data().questions.forEach(question=>{
                let qdata = question
                question_rating = calc_rating(
                    question.status, question.runtime,
                    question.memory, question.submit_time )
                contest_rating += question_rating
                qdata['points'] = question_rating
                questions.push(qdata)
            })
            db.collection('contests').doc(date).collection('ratings').doc(userid).set({
                rating: contest_rating,
                questions : questions
            })
            db.collection('users').doc(userid).update({
                rating: admin.firestore.FieldValue.increment(contest_rating)
            })
            db.collection('temp_contest').doc(userid).delete()
        }
    })
    // calculate the rating generated and append to 'contests' table and update the user ratings
    db.collection('questionsList').doc('questionPointer').set({
        questionPointer : admin.firestore.FieldValue.increment(3)
    }) // incrementing questionPointer EOD
}

app.post('/submission', (req,res) =>{
    userid = req.body.id
    qdata = req.body.qdata
    question = {
        qno : qdata.qno,
        status : qdata.status,
        runtime : qdata.runtime,
        submit_time : qdata.submit_time,
        memory : qdata.memory
    }
    db.collection('temp_contest').doc(userid).get().then(doc=>{
        if(!doc.exists){
            db.collection('temp_contest').doc(userid).set({
                questions : [question]
            })
        }
        else{
            db.collection('temp_contest').doc(userid).update({
                questions: admin.firestore.FieldValue.arrayUnion(question)
            })
        }
    }).then(()=>{
        res.send("Submitted Successfully!")
    }).catch((err)=>{
        res.send("Error: "+err)
    })
})

app.get('/leaderboard',(req,res)=>{
    contest_id = req.query.id
    if(contest_id){
        db.collection("contests").doc(contest_id).collection('ratings').orderBy('rating',"desc").get().then(async docs=>{
            let list = []
            console.log('hi there')
            for(doc of docs.docs){
                let obj = {id:doc.id, rating: doc.data().rating, questions: doc.data().questions}
                list.push(obj)
            }
            res.send(list)
        })
    }
    else{
        db.collection("contests").get().then(docs=>{
            let list = []
            docs.forEach(doc=>{
                list.push(doc.id)
            })
            res.send(list)
        })
    }
})

app.get('/cs',(req,res)=>{
    calcScores()
})

app.listen(8000,()=>{
    console.log("Listening at http://localhost:8000")
})