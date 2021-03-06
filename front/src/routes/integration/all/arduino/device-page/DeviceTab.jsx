import { Text, Localizer } from 'preact-i18n';
import cx from 'classnames';

import style from './style.css';
import { RequestStatus } from '../../../../../utils/consts';
import Device from './Device';

const DeviceTab = ({ children, ...props }) => (
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">
        <Text id="integration.arduino.device.title" />
      </h3>
      <div class="page-options d-flex">
        <select onChange={props.changeOrderDir} class="form-control custom-select w-auto">
          <option value="asc">
            <Text id="global.orderDirAsc" />
          </option>
          <option value="desc">
            <Text id="global.orderDirDesc" />
          </option>
        </select>
        <div class="input-icon ml-2">
          <span class="input-icon-addon">
            <i class="fe fe-search" />
          </span>
          <Localizer>
            <input
              type="text"
              class="form-control w-10"
              placeholder={<Text id="integration.arduino.device.search" />}
              onInput={props.debouncedSearch}
            />
          </Localizer>
        </div>
        <div class="page-options d-flex ml-2">
          <button class="btn btn-info" onClick={props.getUsbPorts && props.getArduinoDevices && props.getDevices}>
            <Text id="integration.arduino.device.refreshButton" />
          </button>
        </div>
        {props.arduinoDevices && props.arduinoDevices.length > 0 && (
          <button class="btn btn-outline-primary ml-2" onClick={props.addDevice}>
            <Text id="scene.newButton" /> <i class="fe fe-plus" />
          </button>
        )}
      </div>
    </div>
    <div class="card-body">
      <div
        class={cx('dimmer', {
          active: props.getArduinoDevicesStatus === RequestStatus.Getting
        })}
      >
        <div class="loader" />
        <div class="dimmer-content">
          {props.arduinoDevices && props.arduinoDevices.length > 0 && (
            <p class="alert alert-success">
              <Text id="integration.arduino.device.arduinoConnected" />
            </p>
          )}
          {props.arduinoDevices && props.arduinoDevices.length === 0 && (
            <p class="alert alert-danger">
              <Text id="integration.arduino.device.arduinoNotConnected" />
            </p>
          )}
          {props.arduinoDevices && props.arduinoDevices.length > 0 && props.devices.length === 0 && (
            <div class="dimmer-content alert alert-info">
              <Text id="integration.arduino.device.noDevices" />
            </div>
          )}
          {props.getArduinoDevicesStatus === RequestStatus.Getting && <div class={style.emptyDiv} />}
          <div class="row">
            {props.arduinoDevices &&
              props.devices &&
              props.devices.map((device, index) => (
                <Device
                  device={device}
                  deviceIndex={index}
                  houses={props.houses}
                  arduinoDevices={props.arduinoDevices}
                  updateDeviceProperty={props.updateDeviceProperty}
                  updateName={props.updateName}
                  updateDataPin={props.updateDataPin}
                  updateFunction={props.updateFunction}
                  updateArduino={props.updateArduino}
                  updateCode={props.updateCode}
                  updateCodeOn={props.updateCodeOn}
                  updateCodeOff={props.updateCodeOff}
                  updateBitLength={props.updateBitLength}
                  updatePulseLength={props.updatePulseLength}
                  updateFeature={props.updateFeature}
                  saveDevice={props.saveDevice}
                  deleteDevice={props.deleteDevice}
                />
              ))}
            {props.arduinoDevices && props.arduinoDevices.length > 0 && props.devices.length === 0 && (
              <div class="dimmer-content alert alert-info">
                <Text id="integration.arduino.device.noDevices" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DeviceTab;
