export default function slugify(string) {
  return string
    .toString() // Cast to string
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string
    .replace(/\s/g, '') // Replace each space with -
    .replace(/\//g, '')
      .replace(/\./g, '')
    .replace(/-/g, '')

}
