export function ComparaRoluriAcces<bool>(
  roluriRuta: string[],
  roluriUser: string[]
) {
  for (var i = 0; i < roluriRuta.length; i++) {
    for (var j = 0; j < roluriUser.length; j++)
      if (roluriRuta[i].toLowerCase() === roluriUser[j].toLowerCase())
        return true;
  }
  return false;
}
