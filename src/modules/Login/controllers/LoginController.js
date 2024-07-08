const jwt = require('jsonwebtoken');
const { userRepo } = require('../../User/repo');

class LoginController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ errors: ['Email e senha são obrigatórios'] });
      }

      const user = await userRepo.getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ errors: ['Email e senha estão incorrentos'] });
      }

      if (!(await userRepo.passwordIsValid(password, user.password))) {
        return res.status(401).json({ errors: ['Email e senha estão incorrentos'] });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_TOKEN, {
        expiresIn: '7d',
      });

      return res.json({ token });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async required(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ errors: ['Login necessário'] });
    }

    try {
      const token = authorization.split(' ')[1];
      const payload = jwt.verify(token, process.env.SECRET_TOKEN);

      req.user = { id: payload.id, email: payload.email };

      const user = await userRepo.getUserById(payload.id);
      if (user.email !== payload.email) {
        return res.status(401).json({ errors: ['Login necessário'] });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ errors: ['Login necessário'] });
    }
  }

  async token(req, res) {

    const { authorization } = req.headers;
    
    if (!authorization) {
      return res.status(401).json({ errors: ['Login necessário'] });
    }
    const token = authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
      }
  
      // Token é válido
      const expiresAt = new Date(decoded.exp * 1000); // Decoded.exp é o timestamp de expiração do token
      res.json({
        status: 'success',
        message: 'Token válido',
        expiresAt: expiresAt.toISOString()
      });
    });
  }
}

module.exports = { LoginController };
