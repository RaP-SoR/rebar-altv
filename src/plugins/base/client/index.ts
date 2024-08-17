import native from 'natives';

// Remove all sounds
native.startAudioScene('DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE'); // removes the music
native.setStaticEmitterEnabled('LOS_SANTOS_VANILLA_UNICORN_01_STAGE', false); // disables the audio from unicorn
native.setStaticEmitterEnabled('LOS_SANTOS_VANILLA_UNICORN_02_MAIN_ROOM', false); // disables the audio from unicorn
native.setStaticEmitterEnabled('LOS_SANTOS_VANILLA_UNICORN_03_BACK_ROOM', false); // disables the audio from unicorn
native.setAmbientZoneListStatePersistent('AZL_DLC_Hei4_Island_Zones', true, true); // cayo ambient
native.setAmbientZoneListStatePersistent('AZL_DLC_Hei4_Island_Disabled_Zones', false, true); // cayo ambien
native.startAudioScene('FBI_HEIST_H5_MUTE_AMBIENCE_SCENE'); // mute fib ambience
native.startAudioScene('CHARACTER_CHANGE_IN_SKY_SCENE'); // starts the sky scene audio if you use a another audio scene e.g DLC_VW_Casino_General you must stop the CHARACTER_CHANGE_IN_SKY_SCENE audio scene before starting the another scene
native.setAudioFlag('PoliceScannerDisabled', true); // Disables the police scanner audio functionality
native.setAudioFlag('DisableFlightMusic', true); // Disables the flight audio functionality
native.startAudioScene('FBI_HEIST_H5_MUTE_AMBIENCE_SCENE'); // Used to stop police sound in town
native.cancelAllPoliceReports(); // Used to stop default police radio around/In police vehicle
native.clearAmbientZoneState('AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_GENERAL', false); // Turn off prison sound
native.clearAmbientZoneState('AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_WARNING', false); // Turn off prison sound
native.clearAmbientZoneState('AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_ALARM', false); // Turn off prison sound
native.clearAmbientZoneState('AZ_DISTANT_SASQUATCH', false); // Turn off sasquatch sounds

// no idea, but Athena nativemode used this, might not be required
native.setAmbientZoneState('', false, false);
