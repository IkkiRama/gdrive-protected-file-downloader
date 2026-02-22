// Create a Trusted Types policy if available
const policy = window.trustedTypes 
  ? trustedTypes.createPolicy('default', { createScriptURL: url => url })
  : null;

let jspdf = document.createElement("script");
jspdf.onload = function () {
  let pdf = new jsPDF();
  let elements = document.getElementsByTagName("img");
  for (let i in elements) {
    let img = elements[i];
    if (!/^blob:/.test(img.src)) {
      continue;
    }
    let canvasElement = document.createElement('canvas');
    let con = canvasElement.getContext("2d");
    canvasElement.width = img.width;
    canvasElement.height = img.height;
    con.drawImage(img, 0, 0, img.width, img.height);
    let imgData = canvasElement.toDataURL("image/jpeg", 1.0);
    pdf.addImage(imgData, 'JPEG', 0, 0);
    pdf.addPage();
  }
  pdf.save("download.pdf");
};

// Use the policy to set the src attribute if available
jspdf.src = policy 
  ? policy.createScriptURL('https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js')
  : 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js';

document.body.appendChild(jspdf);
