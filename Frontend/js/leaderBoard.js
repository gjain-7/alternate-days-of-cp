chrome.storage.sync.get(['user'],function(result){
    const userEmail= result.user.email;
    db.collection("contests").get().then((snapDocs) => {
        var i = 1;
        snapDocs.forEach((doc) => {
            let newOption = new Option(doc.id,i);
            var docm = document;
            document.getElementById("contest-select-box").add(newOption, undefined)
            db.collection("contests").doc(doc.id).collection("ratings").orderBy("rating","desc").get().then((querySnapshot) => {
                querySnapshot.forEach((document) => {
                    var rating = document.data().rating.toString()
                    var name = document.id.toString()
                    var rankdiv = `<div class="item">
                                <p>${name}</p>
                                <p>${rating}</p>     
                                </div>`
                    docm.getElementById('ranked-list').innerHTML += rankdiv;
                    })
            })
        })
    })
   
})



