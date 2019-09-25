let memoryjs = require('memoryjs');
let zandronumProcess;
try {
  zandronumProcess = memoryjs.openProcess('zandronum-svr.exe');
  if(zandronumProcess.szExeFile === ''){
    throw new Error();
  }
}
catch(e){
  console.warn("Process couldn't connect. Some data won't be sent.");
}

module.exports = {
  getDamageFactor() {
    let hex = 0x2833424 + 0x14;
    return memoryjs.readMemory(zandronumProcess.handle, hex, 'float');
  },
  getMapName() {
    
  }
}

/*
EAX=00000000
EBX=02833424
ECX=1ED735C9
EDX=00000000
ESI=02833424
EDI=2E234A64
EBP=0608F81C
ESP=0608F754
EIP=00FEFA16

Probable base pointer =02833424

00FEFA0B - call 00FF0C20
00FEFA10 - add esp,08
00FEFA13 - fstp dword ptr [esi+14]
00FEFA16 - pop esi
00FEFA17 - ret 0008

*/