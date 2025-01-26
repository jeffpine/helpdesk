import axios from 'axios';

export class GoogleMapsService {
  private apiKey: string;

  // constructor
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
// obterLocalizacao
  async obterLocalizacao(): Promise<{ lat: number; lng: number; accuracy: number }> {
    const endpoint = `https://www.googleapis.com/geolocation/v1/geolocate?key=${this.apiKey}`;
    
    try {
      const response = await axios.post(endpoint, { considerIp: true });
      const { location, accuracy } = response.data;
      return { ...location, accuracy };
    } catch (error: any) {
      console.error('Erro ao consultar API de Geolocalização:', error.response.data.error);
      throw new Error('Falha ao obter localização.');
    }
  }
}
