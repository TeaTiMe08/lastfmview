const Applet = imports.ui.applet;
const Util = imports.misc.util;
const Settings = imports.ui.settings;
const Json = imports.gi.Json;
const Soup = imports.gi.Soup;

const _httpSession = new Soup.SessionAsync();
Soup.Session.prototype.add_feature.call(_httpSession, new Soup.ProxyResolverDefault());



function MyApplet(orientation, panel_height, instance_id) {
    this._init(orientation, panel_height, instance_id);
}

MyApplet.prototype = {
    __proto__: Applet.IconApplet.prototype,

    _init: function(orientation, panel_height, instance_id) {
        Applet.IconApplet.prototype._init.call(this, orientation, panel_height, instance_id);

        this.set_applet_icon_name("icon");
        this.set_applet_tooltip(_("Tooltip"));

        this.settings = new Settings.AppletSettings(this, "lastfmview@randomchain.ddns.net", this.instance_id);

        this.settings.bindProperty(Settings.BindingDirection.IN,  // Setting type
            "username",             // The setting key
            "username",             // The property to manage (this.width)
            this.username_changed,  // Callback when value changes
            null);               // Optional callback data
        this.username_changed();

        this.settings.bindProperty(Settings.BindingDirection.IN,  // Setting type
            "confirm",             // The setting key
            "confirm",             // The property to manage (this.width)
            this.confirm_settings,  // Callback when value changes
            null);               // Optional callback data
    },
    
    username_changed: function () {

    },

    password_changed: function () {

    },

    confirm_settings: function () {
        var mes = Soup.Message.new("POST");
        //TODO hier mit lastfm connecten und wenn Verbindung valide OK-Dialog oeffnen
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