Config = {}

Config.Settings = {}
Config.Settings.Ui={
    {
        title="UI",
        icon="fa-solid fa-desktop",
        elements={
            {
                uid="pv-postal:toggle",
                type="checkbox",
                title="Show nearest postal on your interface",
                description="This will show a interface with the closest postal to your location. Disabling this will add realism.",
                isChecked=false,
            },
            {
                uid="pv-postal:move",
                type="button",
                title= "Move Postal Position",
                shouldClose=true,
            },
            {
                uid="pv-cad:edit:hud",
                type="button",
                title= "Move CAD UI positions",
                shouldClose=true,
            },
            {
                uid="qb-hud:open:menu",
                type="button",
                title= "Change QB HUD",
                shouldClose=true,
            }
        }
    },
    {
        title="Gameplay",
        icon="fa-solid fa-gamepad",
        elements={
            {
                uid="pv-settings:weapon-wheel",
                type="checkbox",
                title="Enable weapon wheel",
                description="This will allow you to use the default GTA weapon wheel instead of just the inventory numbers.",
                isChecked=false,
            }
        }
    }
};

----Metadata structrure
----metadata.pv-settings.UID
----
----
----
----
----