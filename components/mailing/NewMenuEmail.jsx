import styles from "@/app/style";
import { format, startOfWeek } from "date-fns";

const NewMenuEmail = ({ prices, date, menuData }) => {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  return (
    <html>
      <body
        style={{
          display: "flex",
          margin: "0 auto",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {" "}
        <header
          style={{
            paddingTop: "20px",
            fontWeight: 600,
            fontSize: "40px",
            color: "#9b2c2c",
            lineHeight: "2px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Alföld Kincse
        </header>
        <table style={{ alignSelf: "center" }}>
          <thead>
            <tr>
              <th></th>
              <th>
                Hétfő <br />
                {format(
                  startOfWeek(
                    new Date(new Date().getFullYear(), 0, date * 7 - 6),
                    {
                      weekStartsOn: 1,
                    }
                  ),
                  "yyyy-MM-dd"
                )}
              </th>
              <th>
                Kedd
                <br />
                {format(
                  startOfWeek(
                    new Date(new Date().getFullYear(), 0, date * 7 - 6),
                    {
                      weekStartsOn: 2,
                    }
                  ),
                  "yyyy-MM-dd"
                )}
              </th>
              <th>
                Szerda
                <br />
                {format(
                  startOfWeek(
                    new Date(new Date().getFullYear(), 0, date * 7 - 6),
                    {
                      weekStartsOn: 3,
                    }
                  ),
                  "yyyy-MM-dd"
                )}
              </th>
              <th>
                Csütörtök
                <br />
                {format(
                  startOfWeek(
                    new Date(new Date().getFullYear(), 0, date * 7 - 6),
                    {
                      weekStartsOn: 4,
                    }
                  ),
                  "yyyy-MM-dd"
                )}
              </th>
              <th>
                Péntek
                <br />
                {format(
                  startOfWeek(
                    new Date(new Date().getFullYear(), 0, date * 7 - 6),
                    {
                      weekStartsOn: 5,
                    }
                  ),
                  "yyyy-MM-dd"
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: "bold" }}>Leves</td>
              {days.map((day, index) => (
                <td>{menuData[day]?.soup || "ezen a napon nincs leves"}</td>
              ))}
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>
                Főétel "A" <br />{" "}
                <p style={{ color: "#9b2c2c", textDecoration: "underline" }}>
                  {prices.price_A}Ft
                </p>
              </td>
              {days.map((day, index) => (
                <td>{menuData[day]?.A || "ezen a napon nincs A menü"}</td>
              ))}
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>
                Főétel "B" <br />{" "}
                <p style={{ color: "#9b2c2c", textDecoration: "underline" }}>
                  {prices.price_B}Ft
                </p>
              </td>
              {days.map((day, index) => (
                <td>{menuData[day]?.B || "ezen a napon nincs B menü"}</td>
              ))}
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>
                Főétel "E" <br />{" "}
                <p style={{ color: "#9b2c2c", textDecoration: "underline" }}>
                  {prices.price_E}Ft
                </p>
              </td>
              {days.map((day, index) => (
                <td>{menuData[day]?.E || "ezen a napon nincs E menü"}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <footer>
          <p
            style={{
              fontStyle: "italic",
              textDecoration: "underline",
              paddingTop: "1.5px",
              fontSize: "23px",
              marginTop: "10px",
            }}
          >
            Leves nélkül:
          </p>
          <ul style={{ listStyleType: "disc" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <li
                style={{
                  marginLeft: "6px",
                  fontSize: "16px",
                  fontStyle: "italic",
                }}
              >
                {menuData[days[0]]?.L1 ||
                  menuData[days[1]]?.L1 ||
                  menuData[days[2]]?.L1 ||
                  menuData[days[3]]?.L1 ||
                  menuData[days[4]]?.L1 ||
                  "Ezen a héten nincs fix 1 menü"}
              </li>
              <p
                style={{
                  fontWeight: "bold",
                  color: "#9b2c2c",
                  textDecoration: "underline",
                }}
              >
                {prices.price_L1}Ft
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <li
                style={{
                  marginLeft: "6px",
                  fontSize: "16px",
                  fontStyle: "italic",
                }}
              >
                {menuData[days[0]]?.L2 ||
                  menuData[days[1]]?.L2 ||
                  menuData[days[2]]?.L2 ||
                  menuData[days[3]]?.L2 ||
                  menuData[days[4]]?.L2 ||
                  "Ezen a héten nincs fix 2 menü"}
              </li>
              <p
                style={{
                  fontWeight: "bold",
                  color: "#9b2c2c",
                  textDecoration: "underline",
                }}
              >
                {prices.price_L2}Ft
              </p>
            </div>
          </ul>
          <p
            style={{
              marginTop: "2px",
              marginBottom: "2px",
              fontWeight: "bold",
              fontSize: "16px",
              color: "#9b2c2c",
            }}
          >
            A napi menü leves helyett rendelhető GYÜMÖLCSLEVES, melyet az előző
            munkanap kérjük jelezni.
          </p>
          <p
            style={{ fontSize: "20px", marginTop: "2px", marginBottom: "2px" }}
          >
            Látogasson meg minket!
          </p>
          <p
            style={{
              fontStyle: "italic",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Napi ételrendelés leadását, módosítását, lemondását előző munkanap
            kérjük leadni!
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "5px",
              borderBottomWidth: "4px",
              borderBottomColor: "#9b2c2c",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                color: "#9b2c2c",
                textTransform: "uppercase",
              }}
            >
              Elviteles doboz ára:
            </p>
            <p style={{ fontWeight: "bold", color: "#9b2c2c" }}>
              {prices.price_takeout}Ft/db
            </p>
          </div>
          <p style={{ fontStyle: "italic" }}>Jó étvágyat kívánunk!</p>
          <p style={{ fontStyle: "italic" }}>(70) 379 5300</p>
          <p style={{ fontStyle: "italic" }}>szivugyunk.vargaeva@gmail.com</p>
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              fontSize: "1rem",
            }}
          >
            Az étlap változtatás jogát fenntartjuk
          </p>
        </footer>
      </body>
    </html>
  );
};

export default NewMenuEmail;
