import { Text, MarkupText, Localizer } from 'preact-i18n';
import cx from 'classnames';
import { RequestStatus } from '../../../../../utils/consts';

const SetupDevice = ({ children, ...props }) => {
  return (
    <div class="card-body">
      <div
        class={cx('dimmer', {
          active: props.connectArduinoStatus === RequestStatus.Getting,
        })}
      >
        <div class="loader" />
        <div class="dimmer-content">
          {props.arduinoConnected && (
            <p class="alert alert-success">
              <Text id="integration.arduino.setup.connected" />
            </p>
          )}
          {!props.arduinoConnected && (
            <p class="alert alert-danger">
              <Text id="integration.arduino.setup.notConnected" />
            </p>
          )}
          {props.arduinoConnectionError && (
            <p class="alert alert-danger">
              <Text id="integration.arduino.setup.connectionError" /> - {props.arduinoConnectionError}
            </p>
          )}
          <p>
            <MarkupText id="integration.arduino.setup.arduinoDescription" />
          </p>
          <form>
            <div class="row mt-5">
              <div class="col">
                <div class="form-group">
                  <label class="form-label">
                    <Text id="integration.arduino.setup.arduinoModelLabel" />
                  </label>
                  <select class="form-control" onChange={props.updateArduinoModel}>
                    <option>
                      <Text id="global.emptySelectOption" />
                    </option>
                    {props.arduinoModelsList &&
                      props.arduinoModelsList.map((model) => (
                        <option value={model} selected={props.arduinoModel === model}>
                          {model}
                        </option>
                      ))}
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">
                    <Text id="integration.arduino.setup.arduinoUsbDriverPathLabel" />
                  </label>
                  <select class="form-control" onChange={props.updateArduinoPath}>
                    <option>
                      <Text id="global.emptySelectOption" />
                    </option>
                    {props.usbPorts &&
                      props.usbPorts.map((usbPort) => (
                        <option value={usbPort.comPath} selected={props.arduinoPath === usbPort.comPath}>
                          {usbPort.comName} - {usbPort.manufacturer}
                        </option>
                      ))}
                  </select>
                </div>

                <button class="btn btn-success" onClick={/*props.savePathAndConnect && */ props.saveArduinoDevice}>
                  <Text id="integration.arduino.setup.connectButton" />
                </button>
                <button class="btn btn-danger ml-2" onClick={props.disconnect}>
                  <Text id="integration.arduino.setup.disconnectButton" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetupDevice;
