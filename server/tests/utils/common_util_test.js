import { assert } from "https://deno.land/std/testing/asserts.ts";
import { CommonUtil } from "../../src/utils/mod.js";

Deno.test("test isPresent with number should return true", () => {
    // given
    const obj = 0;

    // when
    // then
    assert(CommonUtil.isPresent(obj));
});

Deno.test("test isPresent with string should return true", () => {
    // given
    const obj = "test";

    // when
    // then
    assert(CommonUtil.isPresent(obj));
});

Deno.test("test isPresent with array should return true", () => {
    // given
    const obj = [1, 2, 3];

    // when
    // then
    assert(CommonUtil.isPresent(obj));
});

Deno.test("test isPresent with object should return true", () => {
    // given
    const obj = {
        "key": "value",
    };

    // when
    // then
    assert(CommonUtil.isPresent(obj));
});

Deno.test("test isPresent with null should return false", () => {
    // given
    const obj = null;

    // when
    // then
    assert(!CommonUtil.isPresent(obj));
});

Deno.test("test isPresent with undefined should return false", () => {
    // given
    const obj = undefined;

    // when
    // then
    assert(!CommonUtil.isPresent(obj));
});
