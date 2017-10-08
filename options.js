function save_options() {
    let url = document.getElementById('mispURL').value;

    //remove trailing slash
    if (/\/$/.test(url)) {
        url = url.replace(/\/$/,'');
        document.getElementById('mispURL').value = url;
    }

    // checking URL
    let pattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9]{2,256}\.[a-z]{2,6}$/g;
    let url_testresult = pattern.test(url);

    let misp_org = document.getElementById('defaultOrg').value;
        
    let settingsObj = {};
    settingsObj['mispUrl'] =  url;
    settingsObj['defaultOrg'] = misp_org;
    
    chrome.storage.local.set({settingsObj}, function() {

        // Tell user saving worked
        let status = document.getElementById('status');

        if (url_testresult === false){
            status.textContent = "Please check URL. It looks weird. But I won't stop you.";
            status.style.color = "#ff9c00";
        }
        else{

            status.textContent = 'Options saved.';
            status.style.color = "#007dff";
        }

        status.style.fontWeight = "900";

        let button = document.getElementById('save');
        button.style.background = "#007dff";

        setTimeout(function() {
            status.textContent = '';
            button.style.background = "#ccc"
        }, 5000);
        });
    }

function populate_org_options(org_list){
    let myDiv = document.getElementById("orgDiv");

    //Create and append select list
    let selectList = document.createElement("select");
    selectList.id = "orgSelect";
    myDiv.appendChild(selectList);

    //Create and append the options
    for (let i = 1; i < org_list.length+1; i++) {
        let option = document.createElement("option");
        option.value = org_list[i];
        option.text = org_list[i];
        selectList.appendChild(option);
    }
}

function restore_options() {
        
    chrome.storage.local.get({settingsObj: {'mispUrl': 'https://default.local', 'defaultOrg': '1', 'defaultOrgName': 'Default Org (1)'}}, function(result){
        document.getElementById('mispURL').value = result['settingsObj']['mispUrl'];
        document.getElementById('defaultOrg').value = result['settingsObj']['defaultOrg'];
        });
}

/* TODO: Get org info instead of integers
function get_misp_orgs() {

    let org_list = __get_request("https://misp.local", "");

    return org_list;
}
*/

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
