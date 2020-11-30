import React, { Component } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { ip } from "../../utility";
import axios from "axios";

const styles = StyleSheet.create({
	newPage: {marginTop: 30},
	table: { display: "table", width: "90%", margin:'auto', marginBottom: 10,borderStyle: "solid", borderWidth: 1, borderLeft:'none', borderRight:'none', borderColor:'#d8dbe0' }, 
	tableRow: { margin: "auto", flexDirection: "row" }, 
  tableCol1: { width: "35%", borderStyle: "solid", borderWidth: 1, borderLeft:'none', borderRight:'none', borderColor:'#d8dbe0'}, 
  tableCol2: { width: "15%", borderStyle: "solid", borderWidth: 1, borderLeft:'none', borderRight:'none', borderColor:'#d8dbe0'}, 
	tableCellTitle: { margin: 5, fontSize: 13, fontWeight: "bold", color:'#3C4B64' },
  tableCell: { margin: 5, fontSize: 13, color:'#3C4B64' },
  tableCellWithBorder: { margin: 5, fontSize: 13, color:'#3C4B64', borderLeft:'solid' },
  greenAmount : { margin: 5, fontSize: 13, color:'#2EB85C'},
  redAmount : { margin: 5, fontSize: 13, color:'#E55353'},
});

export class ReportPDF extends Component {

	state = {
    ready: false,
    items:[]
	}

	componentDidMount(){
    const token = localStorage.getItem("token");

    if (!token) {
      return window.location = "/login";
    }
    axios
    .get(ip + "/transactions", {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      // console.log(res.data);
      let aux = res.data.map((t) => ({
          ...t,
          date: new Date(t.date).toLocaleString(),
        }))
        this.setState({items:aux, ready:true})
    });
	}
	
	render() {
		return (
			this.state.ready ? 
        <PDFViewer style={{ width: "100%", height: "99.2vh" }}>
          <Document title='Reporte de Transacciones'>
            <Page size="A4"> 
              <View style={styles.newPage}>
                <View style={styles.questionDiv}>
                  <View style={styles.table}> 
                    <View style={styles.tableRow}> 
                      <View style={styles.tableCol1}> 
                        <Text style={styles.tableCellTitle}>Fecha</Text> 
                      </View> 
                      <View style={styles.tableCol1}> 
                        <Text style={styles.tableCellTitle}>Descripcion</Text> 
                      </View>
                      <View style={styles.tableCol2}> 
                        <Text style={styles.tableCellTitle}>Monto</Text> 
                      </View> 
                      <View style={styles.tableCol2}> 
                        <Text style={styles.tableCellTitle}>Ref</Text> 
                      </View>
                    </View> 
                    {this.state.items.map((p,index) =>
                      <View key={index} style={styles.tableRow}> 
                        <View style={styles.tableCol1}> 
                          <Text style={styles.tableCell}>{p.date}</Text> 
                        </View> 
                        <View style={styles.tableCol1}> 
                          <Text style={styles.tableCellWithBorder}>{p.description}</Text> 
                        </View>
                        <View style={styles.tableCol2}> 
                          <Text style={p.credit ? styles.greenAmount : styles.redAmount}>{p.credit ? `+ ${p.amount}` : `- ${p.amount}`}</Text> 
                        </View> 
                         <View style={styles.tableCol2}> 
                          <Text style={styles.tableCell}>{p.ref}</Text> 
                        </View>
                      </View> 
                    )}
                  </View>
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>
			:
			null
		)
	}
}

export default ReportPDF;