export const TuningEvents = {
    RPC: {
        GET_MOD_LABEL: 'asc-tuning:get-mod-label',
        REQUEST_MODS: 'asc-tuning:request-mods',
    },
    ToClient: {
        GET_WHEELS: 'asc-tuning:get-wheels',
        DISABLE_CONTROLS: 'asc-tuning:disable-controls',
        SET_CAMERA: 'asc-tuning:set-camera',
        DEBUG_CAMERA: 'asc-tuning:debug-camera',
        CLOSE: 'asc-tuning:close-tuning',
    },
    ToServer: {
        BUY_TUNING: 'asc-tuning:buy-tuning',
        INSTALL_MOD: 'asc-tuning:install-mod',
        CLOSE: 'asc-tuning:close-tuning',
        CHANGE_PRIMARY_COLOR: 'asc-tuning:change-primary-color',
        CHANGE_SECONDARY_COLOR: 'asc-tuning:change-secondary-color',
        CHANGE_NEON_COLOR: 'asc-tuning:change-neon-color'
    }
}
