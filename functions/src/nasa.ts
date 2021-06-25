/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
import axios from "axios";
import SecretsReader from "./gcp_secrets";

const secretsReader = new SecretsReader();

export async function getRoverManifest(rover: string): Promise<manifest[]> {
  /**
   * @description API call to NASA's Mars Rover Photo's API to fetch
   *  rover manifest data.
   * @param (str) rover: name of the rover
   */
  const nasaKey = await secretsReader.getSecretValue();

  return axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${nasaKey}`
  )
      .then((res) => {
        return res.data;
      })
      .catch((error) => error);
}

export async function getRoverPhotos(
    rover: string,
    sol: number,
    page: number,
    camera="all"
): Promise<photo[]> {
  const nasaKey = await secretsReader.getSecretValue();
  let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=${page}`;
  if (camera !== "all") {
    url = url + `&camera=${camera}`;
  }
  url = url + `&api_key=${nasaKey}`;

  return axios(url)
      .then((res) => res)
      .catch((error) => error);
}

interface manifest {
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
  max_sol: number;
  max_date: string;
  total_photos: number;
  photos: {
    sol: number;
    total_photos: number;
    cameras: string[]
  }
}

interface photo {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: string;
    full_name: string;
  },
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  }
}

