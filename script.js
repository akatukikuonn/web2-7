onload = function(){
  
  var c = document.getElementbyId('canvas');
  c.width = 500;
  c.height = 300;
  
  
   var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  
  var v_shader = create_shader('vs');
  var f_shader = create_shader('fs');
  
  
  var prg =create_program(v_shader,f_shader);
  
  var attLocation = new Array(2);
  attLocation[0] = gl.getAttribLocation(prg,'position');
  attLocation[1] = gl.getattribLocation(prg,'clor');
  
  
  
  var attStride = new Array(2);
  attStride[0] = 3;
  attStride[1] = 4;
  
  
  var position = [
     0.0,1.0,0.0,
     1.0,0.0,0.0,
    -1.0,0.0,0.0,
   ];
  var color = [
     1.0,0.0,0.0,1.0,
     0.0,1.0,0.0,1.0,
     0.0,0.0,1.0,1.0,
  ];
  
  
  var pos_vbo = create_vbo(position);
  var col_vbo = create_vbo(color);
  
  
  set_attribute([pos_vbo,col_vbo],attLocation,attStride);
  
  //unformlocation(46)
  var uniLocation = gl.getUniformlocation(prg,'mvpMatrix');

  
  
  var m =new matIV();
  
  
  var wMatrix = m.identity(m.create());
  var vMatrix = m.identity(m.create());
  var pMatrix = m.identity(m.create());
  var vpMatrix = m.identity(m.create());
  var wvMatrix = m.identity(m.create());
  
  
  m.lookAT([0.0,0.0,5.0],[0,0,0],[0,1,0],vMatrix);
  m,perspective(45, c.width / c.height, 0.1, 100, pMatrix);
  m.multiply(pMatrix, vMatrix, vpMatrix);
  
  
  var cont = 0;
  
  
  (function(){
   
   gl.clearColor(0.0,0.0,0.0,1.0);
   gl.clearDepth(1.0);
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  //かうんた(75)
  var rad =(count% 360) * Math.PI / 180;
  
  
  m.identity(wMatrix);
  m.translate(wMatrix, [1.0, -1.0, 0.0], wMatrix);
  m.rotate(wMatrix, rad, [0, 1, 0], wMatrix);
 
                        
 m.multiply(vpMatrix, wMatrix, wvpMatrix);
 gl.uniformMatriix4fv(uniLocation, false, wvpMatrix);
 gl.drawArrays(gl.TRIANGLES, 0, 3);
  
 
  gl.flush();
                        
                        
  conut++;
   
                        
   setTimeout(arguments.callee, 1000/ 30);
   })();
                        
  //シェーダ生成（98)
  function create_shader(id){
    
    
    var shader;
    
    
    var scriptElement = document.getElementById(id);
    
    
    if(!scriptElement){return;}
    
    
    switch(scriptElement.type){
      case 'x-shader/x-vertex':
        shader = gl.createShader(gl.VERTEX_SHADER);
        break;
      case 'x-shader/x-fragment':
        shader = gl.createShader(gl.FRAGMENT_SHADER);
        break;
      default:
        return;
    }
    
    gl.shaderSource(shader,scriptElement.text);
    
    gl.compileShader(shader);
    
    
    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
      return shader;
    }else{
      
      alert(gl.getShaderInFoLog(shader));
    }
  ]
  
 
  //ぷろぐらむオブジェクトを生成シェーダ(136)
  function create_program(vs,fs){
    var program = gl.createProgram();
    
    
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    
    gl.limkProgram(program);
    
    
    if(gl.getProgramParameter(program,gl.LINK_STATUS)){
      gl.useProgram(program);
      return program;
    }else{
      
      alert(gl.getProgramInFoLog(program));
    }
  }
