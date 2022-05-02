import { ComponentType } from "react";

export function mergeComponents<A, B>(
  a: ComponentType<A>,
  b: ComponentType<B>
): ComponentType<A & B>;

export function mergeComponents<A, B, C>(
  a: ComponentType<A>,
  b: ComponentType<B>,
  c: ComponentType<C>
): ComponentType<A & B & C>;

export function mergeComponents<A, B, C, D>(
  a: ComponentType<A>,
  b: ComponentType<B>,
  c: ComponentType<C>,
  d: ComponentType<D>
): ComponentType<A & B & C & D>;

export function mergeComponents<A, B, C, D, E>(
  a: ComponentType<A>,
  b: ComponentType<B>,
  c: ComponentType<C>,
  d: ComponentType<D>,
  e: ComponentType<E>
): ComponentType<A & B & C & D & E>;

export function mergeComponents<A, B, C, D, E, F>(
  a: ComponentType<A>,
  b: ComponentType<B>,
  c: ComponentType<C>,
  d: ComponentType<D>,
  e: ComponentType<E>,
  f: ComponentType<F>
): ComponentType<A & B & C & D & E & F>;

export function mergeComponents<A, B, C, D, E, F, G>(
  a: ComponentType<A>,
  b: ComponentType<B>,
  c: ComponentType<C>,
  d: ComponentType<D>,
  e: ComponentType<E>,
  f: ComponentType<F>,
  g: ComponentType<G>
): ComponentType<A & B & C & D & E & F & G>;

export function mergeComponents<A, B, C, D, E, F, G, H>(
  a: ComponentType<A>,
  b: ComponentType<B>,
  c: ComponentType<C>,
  d: ComponentType<D>,
  e: ComponentType<E>,
  f: ComponentType<F>,
  g: ComponentType<G>,
  h: ComponentType<H>
): ComponentType<A & B & C & D & E & F & G & H>;

export function mergeComponents<A, B, C, D, E, F, G, H, I>(
  a: ComponentType<A>,
  b: ComponentType<B>,
  c: ComponentType<C>,
  d: ComponentType<D>,
  e: ComponentType<E>,
  f: ComponentType<F>,
  g: ComponentType<G>,
  h: ComponentType<H>,
  i: ComponentType<I>
): ComponentType<A & B & C & D & E & F & G & H & I>;

export function mergeComponents(
  ...components: ComponentType<unknown>[]
): ComponentType<unknown> {
  console.assert(components.length > 0, "Expected 1 or more components");

  if (components.length === 1) {
    return components[0];
  }

  return ({ children, ...rest }) => {
    // We need a copy to avoid a null reference error
    const copy = components.slice();

    const Component = copy.reduce((Prev, Cur) => {
      return ({ children, ...rest }) => (
        <Cur {...rest}>
          <Prev {...rest}>{children}</Prev>
        </Cur>
      );
    });

    return <Component {...rest}>{children}</Component>;
  };
}
