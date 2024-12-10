export default function () {
  return {
    port: process.env.PORT,
    db_port: process.env.POSTGRES_PORT,
    db_host: process.env.POSTGRES_HOST,
    db_user: process.env.POSTGRES_USER,
    db_password: process.env.POSTGRES_PASSWORD,
    db_name: process.env.POSTGRES_DB,
  };
}
