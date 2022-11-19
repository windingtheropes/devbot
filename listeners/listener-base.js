const { Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const bases = {}

module.exports.import = () => {
          
        const readListeners = (dir) => {
          const files = fs.readdirSync(path.join(__dirname, dir));
      
          for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
      
            if (stat.isDirectory()) {
              readListeners(path.join(dir, file))
            }
            else if (file !== 'listener-base.js' && !file.endsWith('base.js') && file.endsWith('.js')) {
              const b = fs.readdirSync(path.join(__dirname, dir)).filter(o => o.endsWith('base.js'));
      
              const base = require(path.join(__dirname, dir, b[0]))
              const listener = require(path.join(__dirname, dir, file))
              base.import(listener)
            }
          }
        }  
        
        readListeners('./')  
}

module.exports.listen = (client) => {
        
      const readBases = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir));

        for (const file of files) {
          const stat = fs.lstatSync(path.join(__dirname, dir, file))
    
          if (stat.isDirectory()) {
              const dirFiles = fs.readdirSync(path.join(__dirname, dir, file));
              for(const f of dirFiles){
                if(f.endsWith('base.js') && f !== 'listener-base.js')
                {
                  const base = require(path.join(__dirname, dir, file, f))
                  base.listen(client)
                }
                else
                {
                  readBases(file)
                }
              }
          }
        }
      }
      readBases('./')
    
}