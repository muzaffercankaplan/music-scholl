import { Link } from "react-router";

const AdminStudents = () => {
  return (
    <div>
      <h2>Öğrenciler</h2>
      <p>
        Liste/ekle/düzenle; detayda paketler, geçmiş, öğretmen ataması, ödeme
        işaretleme
      </p>
      <div style={{ marginTop: 12 }}>
        <h4>Örnek Kayıtlar</h4>
        <ul>
          <li>
            <Link to="/admin/students/1">Ali Yılmaz - Detaya git</Link>
          </li>
          <li>
            <Link to="/admin/students/2">Ayşe Demir - Detaya git</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminStudents;
