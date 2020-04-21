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
        <div class="page-options d-flex">
          <button class="btn btn-info" onClick={props.getUsbPorts}>
            <Text id="integration.arduino.device.refreshButton" />
          </button>
        </div>
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
          {props.getArduinoDevicesStatus === RequestStatus.Getting && <div class={style.emptyDiv} />}
          <div class="row">
            {props.arduinoDevices &&
              props.arduinoDevices.map((arduinoDevice, index) => (
                <Device
                  device={arduinoDevice}
                  deviceIndex={index}
                  houses={props.houses}
                  updateDeviceProperty={props.updateDeviceProperty}
                  saveDevice={props.saveDevice}
                  deleteDevice={props.deleteDevice}
                />
              ))}
            <div class="dimmer-content alert alert-info">
              {/*props.arduinoDevices && props.arduinoDevices.length === 0 && */<Text id="integration.arduino.device.noDevices" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DeviceTab;