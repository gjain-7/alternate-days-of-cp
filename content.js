const observer = new MutationObserver((mutationsList, observer) => {
    //     console.log(mutationsList);
    console.log("=================");
    const childs = mutationsList[0].addedNodes[0].children;
    const status = childs[1].querySelector("a").innerText;
    // const runtime = childs[2].innerText;
    // const memory = childs[2].innerText;
    console.log(status/*, runtime, memory */);
    // alert(`status: ${status}\nruntime: ${runtime}\nmemory: ${memory}`);
    chrome.runtime.sendMessage({
        status : status,
        // runtime : runtime,
        // memory : memory
    });
}
);

observer.observe(document.querySelector(".ant-table-body > table > tbody"),
    { attributes: true, childList: true, subtree: true });

// observer.disconnect();