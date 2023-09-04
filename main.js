// 테이블 내부의 모든 입력 요소를 가져옵니다.
const inputElements = document.querySelectorAll('table input');

// 각 입력 요소에 대한 포커스 이벤트 리스너를 추가합니다.
inputElements.forEach((input) => {
  // 포커스를 받았을 때의 이벤트 핸들러
  input.addEventListener('focus', function () {
    // 포커스를 받은 셀의 열과 행에 대한 id 값을 가져옵니다.
    const cellId = input.id;
    const colId = cellId[0]; // 열에 해당하는 첫 번째 글자 (예: 'F4'에서 'F')
    const rowId = cellId.slice(1); // 행에 해당하는 나머지 부분 (예: 'F4'에서 '4')
    // 해당 열과 행에 대한 td 요소를 가져옵니다.
    const colTd = document.getElementById(colId);
    const rowTd = document.getElementById(rowId);

    // 포커스를 받은 셀의 열과 행에 대한 td 요소의 배경색을 변경합니다.
    if (colTd) {
      colTd.style.backgroundColor = '#AED8E6'; // 열의 배경색을 #AED8E6으로 변경
    }
    if (rowTd) {
      rowTd.style.backgroundColor = '#AED8E6'; // 행의 배경색을 #AED8E6으로 변경
    }
    const cellNum = document.querySelector('span');
    cellNum.innerHTML = 'Cell: ' + cellId;
  });

  // 포커스가 해제될 때의 이벤트 핸들러
  input.addEventListener('blur', function () {
    // 포커스가 해제된 셀의 열과 행에 대한 td 요소의 배경색을 원래대로 돌립니다.
    const cellId = input.id;
    const colId = cellId[0];
    const rowId = cellId.slice(1);

    const colTd = document.getElementById(colId);
    const rowTd = document.getElementById(rowId);

    if (colTd) {
      colTd.style.backgroundColor = '';
    }
    if (rowTd) {
      rowTd.style.backgroundColor = '';
    }

    const cellNum = document.querySelector('span');
    cellNum.innerHTML = 'Cell: ';
  });
});

function saveCell() {
  let cellData = '';
  let i = 0;
  inputElements.forEach((input) => {
  if (input.value){
    cellData += input.value;
  }else{
    cellData += input.value;
  }cellData += ',';
  i++;
  if(i==9){
    cellData = cellData.slice(0,-1);
cellData += '\n';
i=0;
  }});
  console.log(cellData);
  filename = "table.csv";
  
   // IE 10, 11, Edge Run
   if (window.navigator && window.navigator.msSaveOrOpenBlob) {

    var blob = new Blob([decodeURIComponent(cellData)], {
        type: 'text/csv;charset=utf8'
    });

    window.navigator.msSaveOrOpenBlob(blob, filename);

} else if (window.Blob && window.URL) {
    // HTML5 Blob
    var blob = new Blob([cellData], { type: 'text/csv;charset=utf8' });
    var csvUrl = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', csvUrl);
    a.setAttribute('download', filename);
    document.body.appendChild(a);

    a.click()
    a.remove();
} else {
    // Data URI
    var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(cellData);
    var blob = new Blob([cellData], { type: 'text/csv;charset=utf8' });
    var csvUrl = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.setAttribute('target', '_blank');
    a.setAttribute('href', csvData);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click()
    a.remove();
}
}
