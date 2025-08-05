import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { base64 } from '../customer-bill/base64';
(pdfMake as any).vfs = pdfFonts.vfs;

@Component({
  selector: 'app-company-bill',
  templateUrl: './company-bill.component.html',
  styleUrls: ['./company-bill.component.scss'],
})
export class CompanyBillComponent implements OnInit {
  constructor(private cdr:ChangeDetectorRef){}
  signature: string =
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCADsAlgDASIAAhEBAxEB/8QAHQABAAEEAwEAAAAAAAAAAAAAAAECAwcIBAYJBf/EAEQQAAEDBAEDAgQFAgMFBQgDAAEAAgMEBQYRBwgSITFBEyJRYQkUcYGRMqEVI1IWJEKxwTNicpLRFxglNENjgqKy4fD/xAAbAQEAAwEBAQEAAAAAAAAAAAAAAQIDBAUGB//EACwRAQACAgEEAQQBBAIDAAAAAAABAgMRBAUSITETBiJBUWEUFXGBMtEjUpH/2gAMAwEAAhEDEQA/APVNERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEUA7UoCKN+dKUBERARRsFSgIiICIiAiIgIiICIiAiImwREQEREBEUE6QSijuCdwQSiIgIiICKCdJvaCUUbCbQSijYTajcR5Eoo7gncPoU7oEooRTsSijYUFwB15QVIrLapjvRrh57fICuFwA36qNwKkRFIIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIoPogo2N62h/UK26djTp/gn0CfGjOvXZVIiZhE27fa60+db2q1x45mmXs15I8fdXu77K0bj2lUqS4g6U9ytSSBnzOB0NpM6jYudxQuOvC47qynZI2N8rGud6AuG1RV18FHGZJ3tY1uvLnaCisW16J17ctvd7qfK4cdfFI0Pjd3tOj3N8jyuUHgjY9FXzvUm9xtJJTuKtOma12iPbZP0XCq8gtNFPFS1VdDFPP4ije8Bz/wBArVibTqETaI9vpdxVS4rauN7+0A/r91eMwABAJ2dJEx6T/Ksb91KtMmDzrtI+qkTM7uzztT3QLiKnvHuFSJWn9vVN7FXf6oH7XXchz7EcSibNkt8pbc2QhrPjyBvdv6Lh03KvH9dcYbRQ5ZbZ62paHQU8c4L5BrewFaOPmtXvrSZj96O6vp27uO/spK4UNzpZ3FsMrHlnhwa4EtP0KvipHcdtIAOh9/Cz81j7o0e/S7s/RN7VDJu7fykH2XxcnzGwYZZqvIsjrWUduomGSeoedNYFaKWtOo9omYiPL7gdv3Qk6WLGdTHCT7bFdXZ9bI4J2l7C6UAkfp+y7bhnIGKZ7Qi64peILhTA6c+J2wCtsnC5GGN5KzH+YUx5aX8RLsvc4DfhUB7nSHThpvqNLg3a6wUVBPVyShkdO0ve4+wA9V0bh3nDCeYbTVV2H3dle6gqH01Q5o1otWFcd7el++vpkkvLdE60gc7e/ZWmODhs78+Qhnaz+r+n3P0VPMzrZ5/S93nRO/RW2TSPAOgN/wDJUSSjsLe0+RtYYx7njHWc15DxpecgpmVLPhmjgLtE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qkBERAREQEREBERAREQEREBERARR52qG735+qC4iIgIiII8+yefspRBHn7LjVOw8O8b9NfZcpcWqIa4PeNj+ka9VWY37RLEVvxTCqbqHuuVxVTv9o5LTFBPDvx8MhhB1+wXE6oL/AGO04ZaqW92wV0VxvVLSfA9dEv3vX7Lh8k9PuWZjyTJyHi/JE+NyzU0dO9sNMXud2AAbPcPHj6Ls2OcQUlvlprtmd4qL/c6SUTQS1A+SKTRHcG/U7Pv7rp7qRq21dbYz5+s89Dy3xLcrLJSU75LkbYPis32xCnleA3z66ZpffsFrZL1V3usqIPzMkFgaYJfh6ERL4wQT99krKWU8fYxll2sd/vVGySpx6qNZRO3/AEyujcwn/wDcr6jMetbMjdk4hAr5Kb8q4geo2D/0UTyInwfHDAfMNHxZT8s2e2Zve7vQ3HJ6Y0lG+mnbHE8t24x93af9J918XCOOeCcC6iqa0YvQXy4ZS62PqJqyap+NHTRODvlcQ0eD+vutgM94ywzkmghosusrKxlO7vheBqSJ31a72PqqMH40wnAtnG7WI5XjskqJXd8zh9C7Xorzn7qq/HDpvB2J5nhNXldvyqChFLU3OWttz4PHdC/X9fk+fVd4nts+V0F1tN6iZFQVQdDSvgk058fb5O/17l2mVrC0xhvgq60CNrWtaO1vj0WE220iNMWXGzx5DilBa8GusT58Yrow/vHedxua8sPn1I/5r5XIsF/5cxWksGGXGO31DLhAbm6QakgjY8F2hv1I3pZmhhhiDnRMa3vOz2gDaMggbIXsja1zvXQA2o3ryl0hnH8VVldoyWruVS99noxTMgB7WPd528j6+i72AdeynQ+g2pVZnYIiKQREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREEa87QNAUogIiICIiAiIgKh0LHu7nDf29lWiiRQYoz/wjwqDSwlxd26cTske6vImtixJRwS/1NPoB4P33/wBFW6GNxBI8hXETtgUfBj7e0t2FHwWeDryFcRIjRtT2b9dK1O2Qs7I36cVfVPZ52fVSIiYWRhpOzryVUAApRAREUaBERSCIiAign6DaDaCUREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQRsb0mxvW0VswMLw/Z2EF1ERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERRrzvaCUREBERAREQEREBERAREQUnYBIHlRG5zh8zSFWiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIg/9k=';
  ngOnInit(): void {
    this.form.products.forEach((_: any, i: any) => this.updateProduct(i));
    console.log(this.form.products);
    
     this.cdr.detectChanges();
    // setTimeout(() => {
    //   document.getElementById('btn-submit')?.click();
    // }, 1000);
  }

  now = new Date();
  totalMrp = 0;
  totalDiscount = 0;
  totalFinal = 0;
  form: any = {
    invoiceNumber: '2',
    customerName: '2',
    mobile: '2',
    drugLicense: '2',
    address: '2',
    pan: '2',
    products: [
      {
        name: 'HerbMudita Insulin Sugar Care',
        mrp: 1199,
        discount: 199, // Amount, NOT percent!
        qty: 1,
        finalPrice: 1000, // (mrp - discount) * qty
      },
      {
        name: 'Karela Jamun FIZZ Ayurvedic Effervescent',
        mrp: 649,
        discount: 149,
        qty: 1,
        finalPrice: 500,
      },
    ],
  };

  // Called when discount value changes
  updateProduct(i: number) {
    const p = this.form.products[i];
    p.finalPrice = +(p.mrp - p.discount);
    this.calculateTotals();
  }
  addProduct() {
    this.form.products.push({
      name: '',
      mrp: 0,
      qty: 1,
      discount: 40,
      gst: 18,
    });
  }
  calculateTotals() {
    this.totalMrp = this.form.products.reduce(
      (a: any, p: any) => a + (+p.mrp || 0),
      0
    );
    this.totalDiscount = this.form.products.reduce(
      (a: any, p: any) => a + (+p.discount || 0),
      0
    );
    this.totalFinal = this.form.products.reduce(
      (a: any, p: any) => a + (+p.finalPrice || 0),
      0
    );
    console.log(`Total MRP: ${this.totalMrp}, Total Discount: ${this.totalDiscount}, Total Final: ${this.totalFinal}`);
    
  }

  removeProduct(i: number) {
    this.form.products.splice(i, 1);
  }

  onSubmit(formValue: any) {
    console.log(formValue);
    
    // Prepare all calculations here
    const summary = this.calculateSummary(this.form.products);

    const pdfDoc: any = this.buildPdfDefinition(summary);
    pdfMake.createPdf(pdfDoc).open();
    // `Invoice_${this.form.invoiceNumber}.pdf`
  }

calculateSummary(products: any[]) {
  let productRows: any[] = [];
  let totalMrp = 0, totalDiscount = 0, totalFinal = 0;

  products.forEach((p, i) => {
    const qty = p.qty || 1;
    const mrp = (p.mrp || 0) * qty;
    const discount = (p.discount || 0) * qty;
    const final = (p.mrp - p.discount) * qty;

    totalMrp += mrp;
    totalDiscount += discount;
    totalFinal += final;

    productRows.push([
      { text: p.name,alignment: 'center', fontSize: 11 },
      { text: `₹${mrp.toLocaleString('en-IN')}`, alignment: 'center', fontSize: 11 },
      { text: `₹${discount.toLocaleString('en-IN')}`, alignment: 'center', fontSize: 11 },
      { text: `₹${final.toLocaleString('en-IN')}`, alignment: 'center', fontSize: 11 }
    ]);
  });

 const totalAmount = totalFinal; // or your final total amount
  let cgst = +(totalAmount * 9 / 118).toFixed(2); // 9% of GST in 18% GST included
  let sgst = cgst;
  let taxableValue = +(totalAmount - cgst - sgst).toFixed(2);

  // Optional: to match .50 style
  cgst = Math.round(cgst * 2) / 2;
  sgst = cgst;
  taxableValue = +(totalAmount - cgst - sgst).toFixed(2);
  // Add total row
  productRows.push([
    { text: 'Total', bold: true, alignment: 'center', fontSize: 11, margin: [0, 16, 0, 0] },
    { text: `₹${totalMrp.toLocaleString('en-IN')}`, alignment: 'center', bold: true, fontSize: 11, margin: [0, 16, 0, 0] },
    { text: `₹${totalDiscount.toLocaleString('en-IN')}`, alignment: 'center', bold: true, fontSize: 11, margin: [0, 16, 0, 0] },
    { text: `₹${totalFinal.toLocaleString('en-IN')}`, alignment: 'center', bold: true, fontSize: 11, margin: [0, 16, 0, 0] }
  ]);

  return {
    productRows,
    totalMrp,
    totalDiscount,
    totalFinal,
    taxableValue,
    cgstPercent:9,
    sgstPercent:9,
    cgst,
    sgst,
    totalAmount,
  };
}

  buildPdfDefinition(summary: any) {
    return {
      content: [
        // Logo centered (remove columns, use alignment: 'center')
        {
          image: this.getLogoBase64(),
          width: 200,
          alignment: 'center',
          margin: [0, 0, 0, 0],
        },

        // Registered Office Block
        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  stack: [
                    {
                      text: 'Herbmudita Pvt. Ltd.',
                      bold: true,
                      fontSize: 13,
                      margin: [0, 2, 0, 4],
                    },
                    {
                      text: [
                        {
                          text: 'Registered Office: ',
                          bold: true,
                          fontSize: 10,
                        },
                        {
                          text: 'C-54, Kh. No. 442, Gali No. 4A, Dayal Pur, Delhi - 110091',
                          fontSize: 10,
                        },
                        { text: '\nGSTIN: ', bold: true, fontSize: 11 },
                        { text: '07AAHCH6372E1ZJ', fontSize: 10 },
                        {
                          text: '\nFSSAI License No.: ',
                          bold: true,
                          fontSize: 10,
                        },
                        { text: '13325007000053', fontSize: 10 },
                      ],
                      margin: [0, 0, 0, 0],
                    },
                  ],
                  fillColor: '#f2f2f2',
                  alignment: 'left',
                },
              ],
            ],
          },
          layout: {
            hLineWidth: function () {
              return 2;
            },
            vLineWidth: function () {
              return 2;
            },
            hLineColor: function () {
              return '#236081';
            },
            vLineColor: function () {
              return '#236081';
            },
          },
          margin: [0, 20, 0, 10],
        },

        {
          columns: [
            {
              width: '*',
              stack: [
                {
                  text: 'Invoice Details',
                  bold: true,
                  fontSize: 14,
                  margin: [0, 0, 0, 6],
                },
                {
                  text: [
                    { text: 'Invoice Number: ', bold: true, fontSize: 11 },
                    { text: this.form.invoiceNumber, fontSize: 11 },
                  ],
                  margin: [0, 0, 0, 8],
                },
                {
                  text: 'Billed To (Buyer):',
                  fontSize: 10,
                  margin: [0, 17, 0, 5],
                },
                {
                  text: [
                    { text: 'Customer Name: ', bold: true, fontSize: 11 },
                    { text: this.form.customerName, bold: true, fontSize: 11 },
                  ],
                  margin: [0, 0, 0, 5],
                },
                {
                  text: [
                    { text: 'Address: ', fontSize: 11 },
                    { text: this.form.address, fontSize: 11 },
                  ],
                  margin: [0, 0, 0, 5],
                },
                {
                  text: [
                    { text: 'Mobile No.: ', bold: true, fontSize: 11 },
                    { text: this.form.mobile, fontSize: 11 },
                  ],
                  margin: [0, 0, 0, 5],
                },
                {
                  text: [
                    { text: 'Drug License No.: ', bold: true, fontSize: 11 },
                    {
                      text:
                        this.form.drugLicense && this.form.drugLicense.trim()
                          ? this.form.drugLicense
                          : '[Not Provided]',
                      fontSize: 10,
                    },
                  ],
                  margin: [0, 0, 0, 5],
                },
                {
                  text: [
                    { text: 'PAN No.: ', bold: true, fontSize: 11 },
                    {
                      text:
                        this.form.pan && this.form.pan.trim()
                          ? this.form.pan
                          : '[Not Provided]',
                      fontSize: 10,
                    },
                  ],
                  margin: [0, 0, 0, 5],
                },
              ],
            },
            {
              width: 'auto',
              text: [
                { text: 'Date & Time: ', bold: true, fontSize: 11 },
                {
                  text: this.form.dateTime || new Date().toLocaleString(),
                  fontSize: 10,
                },
              ],
              alignment: 'right',
              margin: [0, 18, 0, 0],
            },
          ],
          margin: [0, 8, 0, 10],
        },

        {
          text: 'Detailed Price Calculation (Incl. Discount & GST)',
          bold: true,
          fontSize: 11,
          margin: [0, 10, 0, 14],
        },

      
        // Invoice item table (No, Product Description, Qty, Rate, Total)
       {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'Item', bold: true, fontSize: 11, alignment: 'center' },
              { text: 'MRP (Incl. GST)', bold: true, fontSize: 11, alignment: 'center' },
              { text: 'Discount', bold: true, fontSize: 11, alignment: 'center' },
              { text: 'Final Price', bold: true, fontSize: 11, alignment: 'center' },
            ],
            ...summary.productRows
          ]
        },
        fontSize: 10,
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 10],
      },

      // GST/Total block (ALWAYS after product table)
      // {
      //   columns: [
      //     { width: '*', text: '' },
      //     {
      //       width: 'auto',
      //       stack: [
      //         { text: `Taxable Value: ₹${(summary.taxableValue ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, fontSize: 11 },
      //         { text: `CGST @${summary.cgstPercent}%: ₹${(summary.cgst ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, fontSize: 11 },
      //         { text: `SGST @${summary.sgstPercent}%: ₹${(summary.sgst ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, fontSize: 11 },
      //         { text: `Total Invoice: ₹${(summary.totalAmount ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, bold: true, fontSize: 11, margin: [0, 16, 0, 0] },
      //       ],
      //       alignment: 'left',
      //     }
      //   ],
      //   margin: [0, 20, 0, 16]
      // },

        {
          margin: [0, 26, 0, 0],
          stack: [
               { text: `Taxable Value: ₹${(summary.taxableValue ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,  margin: [0, 5, 0, 0],fontSize: 11 },
              { text: `CGST @${summary.cgstPercent}%: ₹${(summary.cgst ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,margin: [0, 5, 0, 0], fontSize: 11 },
              { text: `SGST @${summary.sgstPercent}%: ₹${(summary.sgst ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,margin: [0, 5, 0, 0], fontSize: 11 },
              // { text: `Total Invoice: ₹${(summary.totalAmount ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, bold: true, fontSize: 11, margin: [0, 16, 0, 0] },
            {
              text: `Total Invoice Amount: ${summary.totalAmount.toFixed(2)}`,
              bold: true,
              fontSize: 12,
              margin: [0, 10, 0, 8],
            },
            {
              text: [
                'Applicable GST @18% is charged on discounted base price ',
              
              ],
              fontSize: 10,
              margin: [0, 15, 0, 10],
            },
            {
              text: 'Thank you for your business!',
              fontSize: 10,
              margin: [0, 15, 0, 0],
            },
          ],
        },
        {
          image: this.signature,
          width: 120, // Adjust as needed
          alignment: 'right',
          margin: [0, 0, 0, 0],
        },
      ],
      images: {
        logo: this.getLogoBase64(),
      },
    };
  }

  getLogoBase64() {
    // Use your real logo from base64.ts
    return 'data:image/png;base64,' + base64;
  }
}
