import java.io.*; 
import java.sql.*; 
import javax.servlet.*; 
import javax.servlet.http.*; 
 
@WebServlet("/student") 
public class StudentServlet extends HttpServlet { 
    static final String URL = "jdbc:mysql://localhost:3306/labdb"; 
    static final String USER = "root", PASS = "password"; 
 
    protected void doPost(HttpServletRequest req, HttpServletResponse res) 
            throws ServletException, IOException { 
        String action = req.getParameter("action"); 
        String name   = req.getParameter("name"); 
        String course = req.getParameter("course"); 
        int marks     = Integer.parseInt(req.getParameter("marks")); 
        try (Connection con = DriverManager.getConnection(URL, USER, PASS)) { 
            if ("add".equals(action)) { 
                PreparedStatement ps = con.prepareStatement( 
                    "INSERT INTO student(name,course,marks) VALUES(?,?,?)"); 
                ps.setString(1,name); ps.setString(2,course); ps.setInt(3,marks); 
                ps.executeUpdate(); 
            } else if ("update".equals(action)) { 
                int id = Integer.parseInt(req.getParameter("id")); 
                PreparedStatement ps = con.prepareStatement( 
                    "UPDATE student SET name=?,course=?,marks=? WHERE id=?"); 
                ps.setString(1,name); ps.setString(2,course); 
                ps.setInt(3,marks);   ps.setInt(4,id); 
                ps.executeUpdate(); 
            } 
        } catch (Exception e) { e.printStackTrace(); } 
        res.sendRedirect("student?action=list"); 
    } 
 
    protected void doGet(HttpServletRequest req, HttpServletResponse res) 
            throws ServletException, IOException { 
        String action = req.getParameter("action"); 
        try (Connection con = DriverManager.getConnection(URL, USER, PASS)) { 
            if ("list".equals(action) || action == null) { 
                Statement st = con.createStatement(); 
                ResultSet rs = st.executeQuery("SELECT * FROM student"); 
                req.setAttribute("students", rs); 
                req.getRequestDispatcher("list.jsp").forward(req, res); 
            } else if ("delete".equals(action)) { 
                int id = Integer.parseInt(req.getParameter("id")); 
                PreparedStatement ps = con.prepareStatement( 
                    "DELETE FROM student WHERE id=?"); 
                ps.setInt(1, id); ps.executeUpdate(); 
                res.sendRedirect("student?action=list"); 
            } 
        } catch (Exception e) { e.printStackTrace(); } 
    } 
} 