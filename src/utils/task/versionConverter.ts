import { getObjectProperty } from '../object';

const versionSchemas = {
  '1.0.0': 'schema',
};

export const versionConverter = (tasksFile: any) => {
  try {
    const { version } = tasksFile;

    const versionSchema = getObjectProperty(versionSchemas, version);

    const hasVersionSchemaError = false;

    if (hasVersionSchemaError) {
      throw new Error('VersionSchemaError');
    }
  } catch (error) {
    console.log(error);
  }
};

/*
  1.0.0
  1.2.0
  2.0.0
  3.0.0
  5.0.0
  6.0.0
*/
