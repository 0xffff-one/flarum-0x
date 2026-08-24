import app from 'flarum/admin/app';

app.initializers.add('hikarilan/flarum-passkey-login', () => {
    app.extensionData.for("hikarilan-passkey-login")
        .registerSetting({
            setting: "hikarilan-passkey-login.relying_party.name",
            label: app.translator.trans('hikarilan-passkey-login.admin.settings.relying_party.name.label'),
            help: app.translator.trans('hikarilan-passkey-login.admin.settings.relying_party.name.help'),
            type: "text",
        })
        .registerSetting({
            setting: "hikarilan-passkey-login.relying_party.id",
            label: app.translator.trans('hikarilan-passkey-login.admin.settings.relying_party.id.label'),
            help: app.translator.trans('hikarilan-passkey-login.admin.settings.relying_party.id.help'),
            type: "text",
        })
        .registerSetting({
            setting: "hikarilan-passkey-login.timeout",
            label: app.translator.trans('hikarilan-passkey-login.admin.settings.timeout.label'),
            help: app.translator.trans('hikarilan-passkey-login.admin.settings.timeout.help'),
            type: "number",
            min: 1
        })
});
