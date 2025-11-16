import { Properties } from 'ts-json-properties';
/**
 *
 *
 * @export
 * @class Config
 */
export class Config {

  private static instance: Config;
  entornoApp: string;

  /**
   * Creates an instance of Config.
   * @memberof Config
   */
  private constructor() {
    this.entornoApp = process.env.ENTORNO_APP || 'local';
    Properties.initialize(`config/${this.entornoApp}/properties.json`);
  }

  /**
   *
   *
   * @static
   * @returns {Config}
   * @memberof Config
   */
  static getInstance(): Config {
    if (!this.instance) {
      this.instance = new Config();
    }
    return this.instance;
  }

  /**
   *
   *
   * @template T
   * @param {string} propertyName
   * @returns {T}
   * @memberof Config
   */
  getProperty<T>(propertyName: string): T {
    return Properties.getValue(propertyName);
  }

  /**
   *
   *
   * @param {string} propertyName
   * @returns {string}
   * @memberof Config
   */
  getEnvironmentVariableOrProperty(propertyName: string): string {
    const environmentValue = process.env[propertyName];
    return environmentValue ? environmentValue : this.getProperty<string>(propertyName);
  }

}
