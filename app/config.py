from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    database_hostname: str | None = None
    database_port: str | None = None
    database_password: str | None = None
    database_name: str | None = None
    database_username: str | None = None
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int
    # Comma-separated list of frontend origins allowed by CORS
    frontend_origins: str = "http://localhost:5173,https://skill2hire.netlify.app"

    class Config:
        env_file = ".env"
        

settings = Settings()