'use strict';
var yeoman = require('yeoman-generator')
,  mkdirp = require('mkdirp')
,  path = require('path')
,   fs = require('fs')

String.prototype.capitalize = function(){
  return this.toLowerCase().replace( /\b\w/g, function (m) {
      return m.toUpperCase();
  });
}

var viewHandler = function(self) {
  var view_Path = [{
    name:'path',
    type:'confirm',
    message:'¿Do you like get the views into app folder?'
  }] 

  var view_newPath = [{
    name:'newPath',
    type:'input',
    message:'So please write the path for views folder'
  }]

  var new_path = function(e) {
    mkdirp(e.newPath , function(err) {
      if(err) return console.log(err,'Ooops');
      console.log("Creating the views folder at path: ",e.newPath)
      try{ 
        var file = self.readFileAsString('./setting/express/index.js');
        file  = file.replace('//end setting',"\t\t.set('views',__dirname+'"+e.newPath+"')"+"\n //end setting")
        self.write('./setting/express/index.js', file ); 
      } catch(err) {
        var file = self.readFileAsString('./app.js');
        file  = file.replace('//end setting',"\t.set('views',__dirname+'"+e.newPath+"')"+"\n //end setting")
        self.write('./app.js', file ); 
      }           
    })
  }//new new path

  var default_path = function(res) {
    if(!res.path) {
      self.prompt(view_newPath,new_path)
      return;
    }
    mkdirp('./app/views',function(err) {
      if(err) return self.log(err,'Ooops');
      self.fs.copy(
        self.templatePath('_index.html'),
        self.destinationPath('./app/views/index.html')
      );
      console.log('Creating the view folder');
      try{ 
        var file = self.readFileAsString('./setting//express/index.js');
        file  = file.replace('//end setting',"\t\t.set('views',__dirname+'/../app/views')"+"\n //end setting")
        self.write('./setting/express/index.js', file ); 
      } catch(err) {
        var file = self.readFileAsString('./app.js');
        self.write('./app.js', file.replace('//end setting',"\t.set('views',__dirname+'./app/views')"+"\n //end setting") ); 
      }
    })

   }//end default path 
   self.prompt(view_Path,default_path)
  }//end view handler 

var staticHandler = function(self)  {
  var path = [{
    name:"path",
    message:"Write the path if you got deep path like /app/views \n you sholud be set main folder /app and then /app/views",
    type:"input"
  }]

  self.prompt(path,function(res) {
    try{ 
      var file = self.readFileAsString('./setting/express/index.js');
      file  = file.replace('//end setting', "\t\t.use(express.static(__dirname+'"+res.path+"'))//statics resources" + "\n //end setting")
      self.write('./setting/express/index.js', file ); 
    } catch(err) {
      var file = self.readFileAsString('./app.js');
      self.write('./app.js', file.replace('//end setting',"\t.use(express.static(__dirname+'"+res.path+"'))//statics resources"+"\n //end setting") ); 
      var file = self.readFileAsString('./app.js');
      self.write('./app.js', file.replace('//end setting',"\t.use(express.static(__dirname+'"+res.path+"'))//statics resources"+"\n //end setting") ); 

    }
  }) }//end static handler 

var engineHandler = function(self) {
 var query = [{
    name:"engine",
    message:"Write the engine view",
    type:"input"
  }]

  self.prompt(query,function(res) {
    try{ 
      var file = self.readFileAsString('./setting/express/index.js');
      file  = file.replace('//end setting', "\t\t.set('view engine','"+res.engine+"' )//engine view" + "\n //end setting")
      self.write('./setting/express/index.js', file ); 
    } catch(err) {
      var file = self.readFileAsString('./app.js');
      self.write('./app.js', file.replace('//end setting',"\t.set('view engine','"+res.engine+"' )//engine view"+"\n //end setting") ); 
    }
  })  }//end engine handler 

var paramHandler = function(self) {
  var query = [{
    name:'key',
    message:'Write the param',
    type:'input'
  }]
  self.prompt(query,function(res) {
    try{ 
      var file = self.readFileAsString('./setting/express/index.js');
      file  = file.replace('//end setting', "\t\t.param('"+res.key+"', (req,res,next,"+res.key+")=> { req."+res.key+" = '"+res.key+"'; next(); })//"+res.key+" param" + "\n //end setting")
      self.write('./setting/express/index.js', file ); 
    } catch(err) {
      var file = self.readFileAsString('./app.js');
      self.write('./app.js', file.replace('//end setting', "\t.param('"+res.key+"', (req,res,next,"+res.key+")=> { req."+res.key+" = '"+res.key+"'; next(); })//"+res.key+" param" + "\n //end setting") ); 
    }
  })}//end param handler 

var createFolderRoot = function(self,name) {
  var path = "./setting/express/routes/"+name
  mkdirp(path,function() {
    self.fs.copyTpl(
      self.templatePath('/controller/_ctrl.js'),
      self.destinationPath(path+"/"+name+".js"),{
        title:name.toLocaleUpperCase(),
        nameCap:name.capitalize(),
        name:name,
        method:self.option
      })

  })//end create 
  
}//end createFolderRoot


module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    var self = this
    self
      .argument('argv', {
        required: true,
        type: String,
        desc: 'define set or route '
      })
      .argument('option', {
        required: false,
        type: String,
        desc: 'set engine'
      })

    if( self.argv === 'set' && self.option === 'engine' ) {
      self.pass = true
      console.log('Setting the engine resources')
      engineHandler(self);
    } else if( self.argv === 'set' && self.option === 'param' ) {
      self.pass = true
      console.log('Setting param to url');
      paramHandler(self); 
    } else if( self.argv === 'set' && self.option === 'view' ) {
      self.pass = true
      console.log('Setting the views')
      viewHandler(self);
    } else if( self.argv === 'set' && self.option === 'static' ) {
      self.pass = true
      console.log('Setting the static folder');
      staticHandler(self);
    }

  },
  promping:function() {
    var self = this;
    if(this.argv == 'set' && !self.option) {
      var query = [{
        type:'list',
        name:'option',
        message:'Barcos y putas con express.js',
        choices:[
          'views',
          'engine',
          'static',
          'param'
        ]
      }]//end query 

      self.prompt(query,function(res) {
        var options = res.option;
        if(options === 'views'){
          console.log('Setting the views')
          viewHandler(self);
        } else if(options === 'engine') {
          console.log('Setting the engine resources')
          engineHandler(self);
        } else if(options === 'static'){
          console.log('Setting the static folder');
          staticHandler(self);
        } else if(options === 'param') {
          paramHandler(self); 
        } 
      })

    } else if(self.argv === 'route') {
      if(self.option === 'GET' || self.option === 'POST' || self.option === 'PUT' || self.option === 'DELETE' ) {
        self.argument('path', {
          required: false,
          type: String,
          desc: 'path for url'
        })      
        var query = [{
          type:'confirm',
          name:'root_dir',
          message:'¿Do you like route folder?'
        }]//end query 

        fs.exists("./setting/express/routes/index.js",function(exists){
          if(exists) {
            var name = self.path.replace("/","").replace(/\//g,"_").replace(":","")    
            var file = self.readFileAsString("./setting/express/routes/index.js");
            if( file.search(name) != -1 ) {
              //found method of just update at the class with the method
              var update = self.readFileAsString("./setting/express/routes/"+name+"/"+name+".js");
              self.write( "./setting/express/routes/"+name+"/"+name+".js", update.replace("//end constructor","//end constructor\n\t"+self.option+"_"+name.capitalize()+"(req,res){\n"+"\t\tres.send('Allo!!')\n\t}//end "+name+" "+self.option+"\n") ) 
              
              var rooter = self.readFileAsString("./setting/express/routes/index.js")
              self.write("./setting/express/routes/index.js", file.replace("//end route "+name,"\t."+self.option.toLowerCase()+"(instance_"+name+"['"+self.option+"_"+name.capitalize()+"'])\n\t//end route "+name+"\n") )   

            } else {
              createFolderRoot(self,name)
              self.write("./setting/express/routes/index.js", file.replace("}//end routes","\n\t//begin route "+name+"\n\tvar "+name+" = require('./"+name+"/"+name+".js')\n\tvar instance_"+name+" = new "+name+"({app:app})\n\tapp\n\t\t.route('"+self.path+"')\n\t\t."+self.option.toLowerCase()+"(instance_"+name+"['"+self.option+"_"+name.capitalize()+"'])\n\t//end route "+name+"\n\n}//end routes" ) )   
            }             

            return;
          }
          self.prompt(query,function(res) {
            if(res.root_dir) {
              var name = self.path.replace("/","").replace(/\//g,"_").replace(":","")
              self.fs.copyTpl(
                self.templatePath('_index.js'),
                self.destinationPath("./setting/express/routes/index.js"),{
                  name:name,
                  path:self.path,
                  method:self.option.toLowerCase(),
                  methodMay:self.option.toUpperCase(),
                  nameCap:name.capitalize()
                })  
              createFolderRoot(self,name)
              return; 
            } 
            var file = self.readFileAsString('./app.js');
            file  = file.replace('//end setting', "//end setting\n\n//begin route "+self.path+"\napp\n\t.route('"+self.path+"')\n\t."+ self.option.toLowerCase()+"(function(req,res) { \n \t\tres.send('welcome to: "+self.path+" :)')\n\t})\n//end route "+self.path+" ")
            self.write('./app.js', file )            
          })                   

        })//end exist folder
          
      }

      

      

        

    /*
      try{ 
        var file = self.readFileAsString('./setting/index.js');
        file  = file.replace('//end setting', "//end setting\n\n//begin route "+self.path+"\napp\n\t.route('"+self.path+"')\n\t."+ self.method.toLowerCase()+"(function(req,res) { \n \t\tres.send('welcome to: "+self.path+" :)')\n\t})\n//end route "+self.path+" ")
        self.write('./setting/index.js', file ); 
      } catch(err) {
        var file = self.readFileAsString('./app.js');
        file  = file.replace('//end setting', "//end setting\n\n//begin route "+self.path+"\napp\n\t.route('"+self.path+"')\n\t."+ self.method.toLowerCase()+"(function(req,res) { \n \t\tres.send('welcome to: "+self.path+" :)')\n\t})\n//end route "+self.path+" ")
        self.write('./app.js', file ) 
      
      }
    */
        


    }
      
    

  }, 
  writing: function () {

  }
});
