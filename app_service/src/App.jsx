import { useEffect, useState } from 'react';

function App() {
    const [personas, setPersonas] = useState([]);
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        dni: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const enviarFormulario = async (e) => {
        e.preventDefault();
        var datos = {
            apellidos: form.apellido,
            nombres: form.nombre,
            dni: form.dni
        };
        try {
            const response = await fetch('http://localhost:8080/insertar_con_rest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
            const data = await response.json();
            console.log('Respuesta del servicio REST:', data);
        } catch (error) {
            console.error('Error en la solicitud REST:', error);
        }
    };

    async function cargarDatosSOAP() {
        // const response = await fetch("http://localhost:8888/consultar_con_soap", requestOptions);
        // console.log(response)
        // const text = await response.text();
        // console.log('Respuesta del servicio SOAP:', text);
        try {

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/xml");
          var raw = "<soapenv:Envelope\r\n  xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"\r\n  xmlns:web=\"http://www.example.com/\">\r\n  <soapenv:Header/>\r\n  <soapenv:Body>\r\n    <web:consultarAlumnos/>\r\n  </soapenv:Body>\r\n</soapenv:Envelope>";
          var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
          };
          const response = await fetch("http://localhost:8888/consultar_con_soap", requestOptions);
          if (!response.ok) {
              throw new Error(`Error al obtener datos del servicio SOAP: ${response.status} ${response.statusText}`);
          }
          
          const text = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(text, "text/xml");
          const personasNodeList = xmlDoc.querySelectorAll("alumnos");
          const personas = Array.from(personasNodeList).map(personaNode => {
            const persona = {
                id: personaNode.querySelector("id").textContent,
                apellidos: personaNode.querySelector("apellidos").textContent,
                nombres: personaNode.querySelector("nombres").textContent,
                dni: personaNode.querySelector("dni").textContent,
            };
            console.log('Persona extraída:', persona);
            return persona;
          });        
          console.log("Datos recibidos del servicio SOAP", personas);
          setPersonas(personas);
        } catch (error) {
            console.error(error);
        }
    }
    
    const removeDuplicates = (array) => {
        const uniqueArray = array.filter((persona, index, self) =>
            index === self.findIndex((p) => p.id === persona.id)
        );
        console.log('Lista de personas:', uniqueArray)
        return uniqueArray;
    };

    const updateTable = () => {
        cargarDatosSOAP();
    };

    useEffect(() => {
        cargarDatosSOAP();
    }, []);

    return (
      <div style={{textAlign: 'center'}}>
          <h1>Servicio REST</h1>
          <form id="formulario" onSubmit={enviarFormulario} style={{
            marginBottom: '20px',
            border: 'solid',
            borderWidth: 3,
            borderRadius: '15px',
            borderColor: '#efd510',
            padding: 40,
            paddingBottom: 20,
            fontWeight: 'bold'
            }}>
              <label>Nombre: </label>
              <input type="text" id="nombre" name="nombre" required value={form.nombre} onChange={handleChange} style={{
                padding: 5,
                borderWidth: 3,
                borderRadius: '5px',
                borderColor: '#efd510',
                margin: 5
              }}/>
              <br />
              <label>Apellido: </label>
              <input type="text" id="apellido" name="apellido" required value={form.apellido} onChange={handleChange} style={{
                padding: 5,
                borderWidth: 3,
                borderRadius: '5px',
                borderColor: '#efd510',
                margin: 5
              }}/>
              <br />
              <label>DNI: </label>
              <input type="text" id="dni" name="dni" required value={form.dni} onChange={handleChange} style={{
                padding: 5,
                borderWidth: 3,
                borderRadius: '5px',
                borderColor: '#efd510',
                margin: 5
              }}/>
              <br />
              <br />
              <button type="submit">Enviar</button>
          </form>
          <h1>Servicio SOAP</h1>
          <div style={{
             marginBottom: '20px',
             border: 'solid',
             borderWidth: 3,
             borderRadius: '15px',
             borderColor: '#efd510',
             padding: 40,
             paddingBottom: 20,
             
          }}>
            <h2>Lista de personas:</h2>
            <h5>Si no se cargan los datos inmediatamente, espere unos momentos y actualice la página</h5>
            <button onClick={() => updateTable}>Actualizar Tabla</button>
            <br />
            <br />
            <table id="soapTable" border="1" style={{
                    borderCollapse: 'collapse',
                    textAlign: 'center',
                    border: 'solid',
                    borderWidth: 3,
                    borderColor: '#efd510',
                    margin: 'auto'
                }}>
                <thead>
                    <tr>
                        <th style={{ border: 'solid', borderWidth: 3, borderColor: '#efd510', paddingLeft: 15, paddingRight: 15}}>ID</th>
                        <th style={{ border: 'solid', borderWidth: 3, borderColor: '#efd510', paddingLeft: 20, paddingRight: 20}}>Apellidos</th>
                        <th style={{ border: 'solid', borderWidth: 3, borderColor: '#efd510', paddingLeft: 20, paddingRight: 20}}>Nombres</th>
                        <th style={{ border: 'solid', borderWidth: 3, borderColor: '#efd510', paddingLeft: 40, paddingRight: 40}}>DNI</th>
                    </tr>
                </thead>
                <tbody>
                        {/* <tr style={{fontWeight: 'bold'}}>
                            <td style={{ border: 'solid', borderWidth: 3, borderColor: '#efd510'}}>1</td>
                            <td style={{ border: 'solid', borderWidth: 3, borderColor: '#efd510'}}>Fernández</td>
                            <td style={{ border: 'solid', borderWidth: 3, borderColor: '#efd510'}}>Jeremías</td>
                            <td style={{ border: 'solid', borderWidth: 3, borderColor: '#efd510'}}>45818649</td>
                        </tr> */}
                    {removeDuplicates(personas).map((persona, index) => (
                        <tr style={{ fontWeight: 'bold' }} key={index}>
                            <td style={{ border: 'solid', borderWidth: 3, borderColor: '#efd510' }}>{persona.id}</td>
                            <td style={{ border: 'solid', borderWidth: 3, borderColor: '#efd510' }}>{persona.apellidos}</td>
                            <td style={{ border: 'solid', borderWidth: 3, borderColor: '#efd510' }}>{persona.nombres}</td>
                            <td style={{ border: 'solid', borderWidth: 3, borderColor: '#efd510' }}>{persona.dni}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
      </div>
  
    );
}

export default App;
