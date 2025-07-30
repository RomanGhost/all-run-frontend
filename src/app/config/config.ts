export const ApiConfig = {
  production: false,
  apiUrl: 'http://localhost:8080/api/',
  version: 'v1',
  timeout: 30000,
  endpoints: {
    workouts: "/workouts/available",
    user: "/user"  
  }
};

export const TelegramApi = {
  nameBot: "all_run_bot", 
  url: "https://t.me",
}