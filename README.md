# Form Space
A fullstack web application where one can create his own forms, fill up others' created forms, and interact through likes and comments. Built with React as frontend using TypeScript, NestJS as backend, and PostgreSQL to manage the data.

## Technology Used  ⚒️
- **Frontend** 
    - React TypeScript
    - Tailwind CSS
    - Redux
    - Axios
- **Backend**
    - NestJS
    - JWT authentication
    - TypeOrm
- **Database**
    - PostgreSQL

### Setup Backend 🚀
```bash
$ cd server
$ npm i
$ npm run start:dev
```

### Setup .env File For Backend 📋
```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USERNAME=postgres_username
POSTGRES_PASSWORD=postgres_password
POSTGRES_DATABASE=postgres_db
JWT_SECRET=your_jwt_secret
```

### Setup Frontend 🚀
```bash
$ cd client
$ npm i
$ npm run dev
```

### Setup .env File For Frontend 📋
```env
VITE_API_URL=your_server_api_url
```

##### Live Preview
[Visit Website](https://form-space.netlify.app/)
###### <small>P.S. The app is hosted on free services, which may cause slow loading and some errors</small>
