const NakalaSparqlURL = `https://www.nakala.fr/sparql/`;
const NakalaPrefixes = `
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX ore: <http://www.openarchives.org/ore/terms/>
`;

const axios = require('axios');

export default class NakalaQL {
  constructor(nakalaUserHandle) {
    this.nakalaUserHandle = nakalaUserHandle;
    this.cachedCollections = null;
  }

  doQuery = (q) => {
    return axios.get(NakalaSparqlURL, {
      params: {
        'default-graph-uri': '',
        query: NakalaPrefixes + q,
        format: 'application/sparql-results+json',
        timeout: 0,
        debug: 'on',
      },
    });
  }

  getMyCollections = () => {
    const nakalaUserHandle = this.nakalaUserHandle;
    return new Promise((resolve, reject) => {
      if (this.cachedCollections !== null) {
        resolve(this.cachedCollections);
        return;
      }

      const q = `
        SELECT ?collection ?nomCollection
        WHERE {
          ?scheme dcterms:creator <http://www.nakala.fr/account/${nakalaUserHandle}> .
          ?collection skos:inScheme ?scheme .?collection skos:prefLabel ?nomCollection .
        }
      `;
      this.doQuery(q)
      .then((response) => {
        console.log("response: ", response);
        this.cachedCollections = response.data;
        resolve(response.data);
        return response.data;
      })
      .catch(error => {
        console.error("doQuery failed: ", error);
        reject(error);
      });
    });
  }

  getCollectionHandle = (name) => {
    return this.getMyCollections().then(collections => {
      const binding = collections.results.bindings.find(line => line.nomCollection.value === name);
      if (binding) {
        return binding.collection.value;
      } else {
        return null;
      }
    });
  }

}
