import express from 'express';
import { IGetUsersRequest, IGetUsersResponse } from '../@types/routes.types.js';
import userController from '../controllers/user.controller.js';
import { checkJsonToken } from '../middlewares/checkJsonToken.js';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();

router.get('/', checkJsonToken, (req: express.Request, res: express.Response) => {
  try {
    if (req.headers["x-user-token"]) {
      res.statusCode = 200;
      const users = userController.getAllUsers();
      res.json(users);
    } else {
      res.status(401).send("You are unauthorized to do this!");
    }
  } catch (error) {
    res.status(500).send("Failed to find users");
  }
});

router.get('/id/:id', (req: express.Request<Store.IGetUserByIdRequestParams>, res: express.Response) => {
  const id = Number(req.params.id);
  const user = userController.findUserById(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("User Not Found!");
  }
});

router.get('/find', checkJsonToken, (req: IGetUsersRequest, res: IGetUsersResponse) => {
  const { id, email, nameQ } = req.query;
  const users = userController.findUsers({ id: Number(id), email, nameQ });

  if (users.length) {
    res.status(200).json(users);
  } else {
    res.status(404).send("No Users Found!");
  }
});


router.post('/login', (req: express.Request, res: express.Response): void => {
  const { email, password } = req.body;

  const user = userController.findUserByEmail(email);

  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  if (password !== user.password) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const tokenPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, {
    expiresIn: "3s",
  });

  res.json({ message: "Login successful", token });
});




export default router;


// Front End
// const handleLogin = (e) => {
//     e.preventDefault();
//     setErrorMsg('');

//     fetch('http://localhost:3000/users/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password })
//     })
//     .then(res => res.json().then(data => {
//       if (!res.ok) {
//         setErrorMsg(data.message || 'Login failed');
//       } else {
//         localStorage.setItem('jwtToken', data.token);
//         window.location.href = '/products';
//       }
//     }))
//     .catch(() => {
//       setErrorMsg('Network error. Please try again.');
//     });
//   };

// in products page 
// useEffect(() => {
//     const token = localStorage.getItem('jwtToken');
//     if (!token) {
//       window.location.href = '/login';
//       return;
//     }

//     fetch('http://localhost:3000/users/find', {
//       headers: { 'Authorization': `Bearer ${token}` }
//     })
//     .then(res => {
//       if (res.status === 401) {
//         localStorage.removeItem('jwtToken');
//         window.location.href = '/login';
//         return null;
//       }
//       if (!res.ok) throw new Error('Failed to fetch data');
//       return res.json();
//     })
//    
//     .catch(err => {
//       setError(err.message);
//     });
//   }, []);