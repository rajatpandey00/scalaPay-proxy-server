export function getEnvValue(key: string): string {
  const value = process.env[key];
  if(!value){
    console.log(key, 'is missing in evn')
    throw new Error('Environment varibale not found')
  }
  return value;
}

export default getEnvValue;