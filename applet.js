const Applet = imports.ui.applet;
const Util = imports.misc.util;
const Settings = imports.ui.settings;

function MyApplet(orientation, panel_height, instance_id) {
    this._init(orientation, panel_height, instance_id);
}

MyApplet.prototype = {
    __proto__: Applet.IconApplet.prototype,

    _init: function(orientation, panel_height, instance_id) {
        Applet.IconApplet.prototype._init.call(this, orientation, panel_height, instance_id);

        this.set_applet_icon_name("force-exit");
        this.set_applet_tooltip(_("Tooltip"));

        this.settings = new Settings.AppletSettings(this, "lastfmview@randomchain.ddns.net", this.instance_id);

        this.settings.bindProperty(Settings.BindingDirection.IN,  // Setting type
            "username",             // The setting key
            "username",             // The property to manage (this.width)
            this.width_changed,  // Callback when value changes
            null);               // Optional callback data
        this.username_changed();
    },
    
    username_changed: function () {
        return;
    },

    on_applet_clicked: function() {
        Util.spawn(['spotify']);
    },

    on_applet_removed_from_panel: function() {
        this.settings.finalize();
    }
};

function main(metadata, orientation, panel_height, instance_id) {
    return new MyApplet(orientation, panel_height, instance_id);
}