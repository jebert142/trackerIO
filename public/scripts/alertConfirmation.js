function confirmAction(){
    let confirmAction = confirm('Are you sure?')
    if(confirmAction){
        alert("Action Successfully Executed")
    }else{
        alert("Action Canceled")
    }
}