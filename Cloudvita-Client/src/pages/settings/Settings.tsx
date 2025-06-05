import { useTranslation } from 'react-i18next'
import { useSettingsContext } from '~/context/settingsContext'
import {
  getSettingsTheme,
  getSettingsTimeFormat,
  getSettingsTemperature,
  getSettingsSpeed,
  getSettingsPressure,
  getSettingsLanguage
} from './Settings.constants'
import SelectInput from '~/components/select-input/SelectInput'
import './settings.scss'

const Settings: React.FC = () => {
  const { t } = useTranslation()
  const { settings, onSettingChange } = useSettingsContext()

  return (
    <div className="settings">
      <div className="settings__item settings-item">
        <h2 className="settings-item__title">
          {t('settings.userInterface.title')}
        </h2>
        <ul className="settings-item__list settings-item-list">
          <li className="settings-item-list__item">
            <div className="settings-item-list__item-info item-info">
              <h4 className="item-info__title">
                {t('settings.userInterface.language.title')}
              </h4>
              <p className="item-info__text">
                {t('settings.userInterface.language.subtitle')}
              </p>
            </div>
            <SelectInput
              value={settings.language}
              setValue={(value) => onSettingChange('language', value)}
              label={t('settings.userInterface.language.label')}
              options={getSettingsLanguage(t)}
            />
          </li>
          <li className="settings-item-list__item">
            <div className="settings-item-list__item-info item-info">
              <h4 className="item-info__title">
                {t('settings.userInterface.theme.title')}
              </h4>
              <p className="item-info__text">
                {t('settings.userInterface.theme.subtitle')}
              </p>
            </div>
            <SelectInput
              value={settings.theme}
              setValue={(value) => onSettingChange('theme', value)}
              label={t('settings.userInterface.theme.label')}
              options={getSettingsTheme(t)}
            />
          </li>
        </ul>
      </div>
      <div className="settings__item settings-item">
        <h2 className="settings-item__title">
          {t('settings.generalSettings.title')}
        </h2>
        <ul className="settings-item__list settings-item-list">
          <li className="settings-item-list__item">
            <div className="settings-item-list__item-info item-info">
              <h4 className="item-info__title">
                {t('settings.generalSettings.timeFormat.title')}
              </h4>
              <p className="item-info__text">
                {t('settings.generalSettings.timeFormat.subtitle')}
              </p>
            </div>
            <SelectInput
              value={settings.timeFormat}
              setValue={(value) => onSettingChange('timeFormat', value)}
              label={t('settings.generalSettings.timeFormat.label')}
              options={getSettingsTimeFormat(t)}
            />
          </li>
        </ul>
      </div>
      <div className="settings__item settings-item">
        <h2 className="settings-item__title">{t('settings.units.title')}</h2>
        <ul className="settings-item__list settings-item-list">
          <li className="settings-item-list__item">
            <div className="settings-item-list__item-info item-info">
              <h4 className="item-info__title">
                {t('settings.units.temperature.title')}
              </h4>
              <p className="item-info__text">
                {t('settings.units.temperature.subtitle')}
              </p>
            </div>
            <SelectInput
              value={settings.degreeUnit}
              setValue={(value) => onSettingChange('degreeUnit', value)}
              label={t('settings.units.temperature.label')}
              options={getSettingsTemperature(t)}
            />
          </li>
          <li className="settings-item-list__item">
            <div className="settings-item-list__item-info item-info">
              <h4 className="item-info__title">
                {t('settings.units.speed.title')}
              </h4>
              <p className="item-info__text">
                {t('settings.units.speed.subtitle')}
              </p>
            </div>
            <SelectInput
              value={settings.speedUnit}
              setValue={(value) => onSettingChange('speedUnit', value)}
              label={t('settings.units.speed.label')}
              options={getSettingsSpeed(t)}
            />
          </li>
          <li className="settings-item-list__item">
            <div className="settings-item-list__item-info item-info">
              <h4 className="item-info__title">
                {t('settings.units.pressure.title')}
              </h4>
              <p className="item-info__text">
                {t('settings.units.pressure.subtitle')}
              </p>
            </div>
            <SelectInput
              value={settings.pressureUnit}
              setValue={(value) => onSettingChange('pressureUnit', value)}
              label={t('settings.units.pressure.label')}
              options={getSettingsPressure(t)}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Settings
