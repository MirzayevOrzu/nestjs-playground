import { Max, Min } from 'class-validator';

export class CreateCatDto1 {
  /**
   * Name of cat
   * @example 'Malla'
   */
  name: string;

  /**
   * Breed of cat
   * @example 'Persian'
   */
  breed: string;

  /**
   * Age of cat
   * @example 1
   * @format integer
   */
  @Min(0)
  @Max(20)
  age?: number;
}
