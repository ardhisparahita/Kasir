import { Request, Response } from "express";
import excelJS from "exceljs"
const db = require("./../db/models")

const exportSell = async(req: Request, res: Response) => {
  try{
  const workBook = new excelJS.Workbook()
  const workSheet = workBook.addWorksheet("My Stock")
  const path = "./files"

  workSheet.columns = [
    {header: "No", key: "no", width: 10},
    {header: "Amount", key: "amount", width: 10},
    {header: "Price", key: "price", width: 10},
    {header: "Date", key: "date", width: 10},
    {header: "Cash", key: "cash", width: 10},
    {header: "Change", key: "change", width: 10},
    {header: "Status", key: "status", width: 10},
  ]

  let counter = 1
  // console.log(Stock)
  // const obj = Stock
  // console.log(obj)

  const dataSell = await db.sell.findAll()

  dataSell.forEach((sell:any) => {
    sell.no = counter;
    workSheet.addRow(sell); // Add data in worksheet
    counter++;
  });
  // const test = Object.keys(obj)
  // Array.from(obj).forEach((Obj) => {
  //   Obj.s_no = counter
  //   workSheet.addRow(Obj)
  //   counter++
  // });
  // console.log(test)
  workSheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true}
  })
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
  )
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=users.xlsx`
  )

  return workBook.xlsx.write(res).then(() => {
    res.status(200)
  })
  
  }catch (err) {
    res.send({
      status: "error",
      messages: "Something went wrong"
    })
  }
}

export default exportSell