// function GetParentResourceName(){
//     return "test";
// }

function generateCheckbox(page,checked,uniqueid,title,description){
    let check="";
    if(checked) check='checked="checked"';

    let element='<label class="checkmark-container">';
    element+='<div class="checkmark">';
    element+='<input type="checkbox" class="checkbox" onchange="checkboxChange(this)" data-uid="'+uniqueid+'" '+check+'>';
    element+='</div>';
    element+='<div class="checkmark-label">';
    element+='<p class="checkmark-title">'+title+'</p>';
    element+='<p class="checkmark-description">'+description+'</p>';
    element+='</div></label>';

    $("#"+page).append(element);
}

function generateButton(page,uniqueid,title,shouldClose){
    let element='<div><button type="button" class="btn" data-uid="'+uniqueid+'" onclick="clickedButton(this)" data-shouldclose="'+shouldClose+'">'+title+'</button></div>';

    $("#"+page).append(element);
}

function generateNumberInput(page, defaultValue,uniqueid,title, description){
    let check='value="'+defaultValue+'"';

    let element='<label class="checkmark-container">';
    element+='<div class="checkmark">';
    element+='<input type="number" class="number-input" onchange="numberInputChange(this)" data-uid="'+uniqueid+'" '+check+'>';
    element+='</div>';
    element+='<div class="checkmark-label">';
    element+='<p class="checkmark-title">'+title+'</p>';
    element+='<p class="checkmark-description">'+description+'</p>';
    element+='</div></label>';

    $("#"+page).append(element);
}

function generateTitle(page,title){
    let element='<h3 class="content-title">'+title+'</h3>';
    $("#"+page).append(element);
}

function generatePage(isActive,pageId,title,icon){

    let active="";
    if(isActive) active="active";

    let element='<div class="content-page '+active+'" id="page-'+pageId+'"></div>';
    $(".inner-content").append(element);

    let sidelem='<div class="side-item '+active+'" onclick="openPage('+pageId+',this)">';
    sidelem+='<i class="'+icon+'"></i> '+title;
    sidelem+='</div>';

    $(".sidemenu").append(sidelem);
}

function clickedButton(e){
    let uid=$(e).data("uid");
    let shouldClose=$(e).data('shouldclose');

    if(shouldClose===true) closeUi();

    triggerNuiCallback(uid,{},"buttonClicked");

    

}

function checkboxChange(e){
    let uid=$(e).data("uid");

    let d = {};

    d.checked = $(e).is(":checked");

    triggerNuiCallback(uid,d,"checkboxChange");
}

function numberInputChange(e){
    let uid=$(e).data("uid");

    let d = {};

    d.value = parseFloat($(this).value);

    triggerNuiCallback(uid,d,"numberChange");
}

function triggerNuiCallback(uid,data,type){
    let d= data;
    d.uid=uid;
    fetch(`https://${GetParentResourceName()}/`+type, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(d)
    }).then(resp => {})
}

function closeUi(){

    $("#pv-settings-menu").hide();
    fetch(`https://${GetParentResourceName()}/settingsCloseUi`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({})
    }).then(resp => resp.json()).then(resp => {});
}

function openUi(){
    $("#pv-settings-menu").show();
}

function openPage(id,e){
    $(".side-item, .content-page").removeClass('active');

    $("#page-"+id).addClass('active');
    $(e).addClass('active');
}

$(document).on('keydown', function(event) {
    if (event.key == "Escape") {
        closeUi();
    }
});

function generateUi(config){
    $("#settings-menu").html("");
    $("#settings-content").html('<img src="assets/images/pv_logo.png" height="60px" id="brand-logo">');

    for(let k in config){
        if(!config.hasOwnProperty(k)) continue;
        let page=config[k];
        if(parseInt(k)===0) generatePage(true,k,page.title,page.icon);
        else generatePage(false,k,page.title,page.icon);

        for(let j in page.elements){
            if(!page.elements.hasOwnProperty(j)) continue;
            let elem=page.elements[j];

            let pageId="page-"+k;

            switch(elem.type){
                case 'button':
                    generateButton(pageId,elem.uid,elem.title,elem.shouldClose);
                    break;
                case 'title':
                    generateTitle(pageId,elem.title);
                    break;
                case 'checkbox':
                    generateCheckbox(pageId,elem.isChecked,elem.uid,elem.title,elem.description);
                    break;
                case 'number':
                    generateNumberInput(pageId, elem.defaultValue,elem.uid,elem.title, elem.description);
            }
        }

    }
}

window.addEventListener('message', (event) => {
    let data = event.data
    if(data.action === 'generateUi') {
        generateUi(data.config);
    } else if(data.action === 'openUi'){
        openUi();
    }
})