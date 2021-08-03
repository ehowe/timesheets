/*
** Utils
*
*  Some util functions
*/
export default {
  camelize,
  genId,
}

/*
** Camelize
*
*  Converts an underscore string (I.e: "hello_world") into a camel string
*  ("HelloWorld").
*
*  Source: https://stackoverflow.com/a/35976812/1996540
*/
function camelize(str: string): string {
  return str.split('_').map(function(word,index){
  // If it is the first word make sure to lowercase all the chars.
  if(index == 0){
    return word.toLowerCase()
  }
  // If it is not the first word only upper case the first char and lowercase
  // the rest.
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  }).join('')
}

function genId(): number {
  return new Date().getTime()
}
