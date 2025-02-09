import { StyleSheet } from "@react-pdf/renderer";

export const pdfCommonStyles = StyleSheet.create({
  text: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#000",
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#000",
  },
  textLight: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#444",
  },
  row: {
    flexDirection: "row",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowBetweenCentered: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
