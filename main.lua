QBCore = exports['qb-core']:GetCoreObject()

AddEventHandler('onClientResourceStart', function (resourceName)
    if(GetCurrentResourceName() ~= resourceName) then
        return
    end
    QBCore = exports['qb-core']:GetCoreObject()
    generateUi();
end)

RegisterNetEvent('QBCore:Client:OnPlayerLoaded', function()
    generateUi()
end)

function generateUi()
    local Player = QBCore.Functions.GetPlayerData();
    local settings=Player["metadata"]["pv-settings"];

    if(settings == nil) then
        settings={};
    end

    local c = {};

    for k,v in ipairs(Config.Settings.Ui) do
        local nk=#c+1;
        c[nk]={
            title=v.title,
            icon=v.icon,
            elements={},
        };

        for key,val in ipairs(v.elements) do
            local newkey=#c[nk]["elements"]+1;
            c[nk]["elements"][newkey]=val;

            if(val.type=="checkbox") then
                if(settings[val.uid] ~= nil) then
                    c[nk]["elements"][newkey]["isChecked"]=settings[val.uid];
                    changeSettingByUid(val.uid,settings[val.uid]);
                end
            end

            if(val.type=="number") then
                if(settings[val.uid] ~= nil) then
                    c[nk]["elements"][newkey]["defaultValue"]=settings[val.uid];
                    changeSettingByUid(val.uid,settings[val.uid]);
                end
            end

        end

    end

    SendNUIMessage({
        config = c,
        action = "generateUi"
    })
end

function checkboxChange(uid,checked)
    if(checked == true or checked == "true") then checked=true; else checked=false; end;
    changeSettingByUid(uid,checked);
end

function changeSettingByUid(uid,newVal)
    local Player = QBCore.Functions.GetPlayerData();

    local settings=Player["metadata"]["pv-settings"];
    if(settings == nil) then
        settings={};
    end

    settings[uid]=newVal;

    TriggerServerEvent("QBCore:Server:SetMetaData", "pv-settings", settings)
    TriggerEvent(uid,newVal);
end

RegisterNUICallback('settingsCloseUi', function(data, cb)
    SetNuiFocus(false,false);
    cb(true)
end)

function triggerSettingsEvent(event,data)
    TriggerEvent(event,data);
end

RegisterNUICallback('settingsCloseUi', function(data, cb)
    SetNuiFocus(false,false);
    cb(true)
end)

RegisterNUICallback('buttonClicked', function(data, cb)
    triggerSettingsEvent(data["uid"],data);
    cb(true)
end)
RegisterNUICallback('checkboxChange', function(data, cb)
    checkboxChange(data["uid"],data["checked"]);
    cb(true)
end)
RegisterNUICallback('numberChange', function(data, cb)
    changeSettingByUid(data["uid"],data["value"]);
    cb(true)
end)

RegisterCommand("settings", function(source, args, rawCommand)
    SendNUIMessage({
        action = "openUi"
    })
    SetNuiFocus(true,true);
end, false)

RegisterKeyMapping('settings', 'Open Settings', 'keyboard', 'I')