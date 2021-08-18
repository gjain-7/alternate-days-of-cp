const observer = new MutationObserver((mutationsList, observer) => {
    const childs = mutationsList[0].addedNodes[0].children;
    const status = childs[1].querySelector("a").innerText;
    const runtime = childs[2].innerText;
    // const memory = childs[2].innerText;
    console.log(status, runtime/*, memory */);
    alert(`status: ${status}\nruntime: ${runtime}`);
    chrome.runtime.sendMessage({
        status : status,
        runtime : runtime,
        // memory : memory
    });
});

t = setInterval(()=>{
    if(document.querySelector(".submit__2ISl")){
        document.querySelector(".submit__2ISl").addEventListener('click',()=>{
            observer.observe(document.querySelector(".ant-table-body > table > tbody"),
                { attributes: true, childList: true, subtree: true });
        });
        clearInterval(t);
    }
},1000)

// observer.disconnect();