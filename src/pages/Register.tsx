
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

<input
  type="text"
  placeholder="Nombre completo"
  value={name}
  onChange={(e) => setName(e.target.value)}
  maxLength={100}
  required
/>

<input
  type="email"
  placeholder="Correo electrónico"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

<input
  type="password"
  placeholder="Contraseña"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  minLength={8}
  maxLength={72}
  required
/>
