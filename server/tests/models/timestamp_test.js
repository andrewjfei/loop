import { assertEquals } from "https://deno.land/std@0.201.0/assert/mod.ts";
import { Timestamp } from "../../src/models/mod.js";

Deno.test("test (date, time) constructor creates correct object", () => {
    // given
    const date = "2023-08-28";
    const time = "13:30:00";

    // when
    const timestamp = new Timestamp(date, time);

    // then
    assertEquals(timestamp.year, 2023);
    assertEquals(timestamp.month, 8);
    assertEquals(timestamp.day, 28);
    assertEquals(timestamp.hour, 13);
    assertEquals(timestamp.minute, 30);
    assertEquals(timestamp.second, 0);
});

Deno.test("test toString returns correct result", () => {
    // given
    const date = "2023-08-28";
    const time = "13:30:00";
    const timestamp = new Timestamp(date, time);

    // when
    // then
    assertEquals(timestamp.toString(), "2023-08-28 13:30:00");
});

Deno.test("test add with no overflow returns correct result", () => {
    // given
    const date = "2023-08-28";
    const time = "13:30:00";
    const timestamp = new Timestamp(date, time);

    // when
    timestamp.add("00:00:30");

    // then
    assertEquals(timestamp.toString(), "2023-08-28 13:30:30");
});

Deno.test("test add with second overflow returns correct result", () => {
    // given
    const date = "2023-08-28";
    const time = "13:30:00";
    const timestamp = new Timestamp(date, time);

    // when
    timestamp.add("00:00:90");

    // then
    assertEquals(timestamp.toString(), "2023-08-28 13:31:30");
});

Deno.test("test add with minute overflow returns correct result", () => {
    // given
    const date = "2023-08-28";
    const time = "13:30:00";
    const timestamp = new Timestamp(date, time);

    // when
    timestamp.add("00:31:00");

    // then
    assertEquals(timestamp.toString(), "2023-08-28 14:01:00");
});

Deno.test("test add with hour overflow returns correct result", () => {
    // given
    const date = "2023-08-28";
    const time = "13:30:00";
    const timestamp = new Timestamp(date, time);

    // when
    timestamp.add("12:00:00");

    // then
    assertEquals(timestamp.toString(), "2023-08-29 01:30:00");
});

Deno.test("test add with day overflow returns correct result", () => {
    // todo: add more tests to cover all cases when months are 28, 29, 30, and 31 days
    // given
    const date = "2023-06-28";
    const time = "13:30:00";
    const timestamp = new Timestamp(date, time);

    // when
    timestamp.add("72:00:00");

    // then
    assertEquals(timestamp.toString(), "2023-07-01 13:30:00");
});

Deno.test("test add with month overflow returns correct result", () => {
    // todo: fix test case date once month day overflow is fixed
    // given
    const date = "2023-12-30";
    const time = "13:30:00";
    const timestamp = new Timestamp(date, time);

    // when
    timestamp.add("24:00:00");

    // then
    assertEquals(timestamp.toString(), "2024-01-01 13:30:00");
});
