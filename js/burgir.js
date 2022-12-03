let open = false;

document.getElementById('burgir').onclick = async function() {
    //alert("workz")
    if(open) {
        document.getElementById('rev').style.marginRight = "-100%";
        await new Promise((resolve, reject) => setTimeout(resolve, 500));
        document.getElementById('rev').style.display = "none";
        open = false;
    } else {
        document.getElementById('rev').style.display = "block";
        await new Promise((resolve, reject) => setTimeout(resolve, 10));
        document.getElementById('rev').style.marginRight = "0";
        open = true;
    }
    
}