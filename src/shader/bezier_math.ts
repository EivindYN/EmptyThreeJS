import { Vector2 } from "three"
import { bezier_p0, bezier_p1, bezier_p2, bezier_p3 } from "./bezier_data";

function get_bezier_iteration(iteration) {
    let pXfull = [bezier_p0(), bezier_p1(), bezier_p2(), bezier_p3()]
    let pfull = Array()
    for (let n = 0; n < 4; n++) {
        let p = Array()
        for (let i = 0; i < 6; i++) {
            p.push(pXfull[n][i + iteration * 6].multiplyScalar(2))
        }
        pfull.push(p)
    }
    return pfull
}

function get_bezier_time(time) {
    let iteration_start = parseInt(time) % 8;
    let iteration_end = parseInt(time + 1) % 8;
    let fraction = time % 1
    let bezier_start = get_bezier_iteration(iteration_start)
    let bezier_end = get_bezier_iteration(iteration_end)
    let pfull = Array()
    for (let n = 0; n < 4; n++) {
        let p = Array()
        for (let i = 0; i < 6; i++) {
            let start = bezier_start[n][i].multiplyScalar(1 - fraction)
            let end = bezier_end[n][i].multiplyScalar(fraction)
            p.push(start.add(end))
        }
        pfull.push(p)
    }
    return pfull
}

function bezier(t, p0, p1, p2, p3) {
    let cX = 3. * (p1.x - p0.x);
    let bX = 3. * (p2.x - p1.x) - cX;
    let aX = p3.x - p0.x - cX - bX;

    let cY = 3. * (p1.y - p0.y);
    let bY = 3. * (p2.y - p1.y) - cY;
    let aY = p3.y - p0.y - cY - bY;

    let x = (aX * t * t * t) + (bX * t * t) + (cX * t) + p0.x;
    let y = (aY * t * t * t) + (bY * t * t) + (cY * t) + p0.y;

    return new Vector2(x, y);
}

function get_bezier_positions(p0, p1, p2, p3) {
    let points = Array();
    for (let i = 0; i < 100; i++) {
        points.push(bezier(0.01 * i, p0, p1, p2, p3));
    }
    return points;
}

function is_within(last_pos: Vector2, pos: Vector2, limit) {
    return Math.abs(pos.x - last_pos.x) < limit && Math.abs(pos.y - last_pos.y) < limit
    //return pos.distanceTo(last_pos) < limit
}

export function calculate_bezier_points(time): Vector2[] {
    let points = [...Array(256).fill(new Vector2(-1, -1))];
    let beziers = get_bezier_time(time)

    let index = 0;
    for (let n = 0; n < 6; n++) {
        let p0 = beziers[0][n]
        let p1 = beziers[1][n]
        let p2 = beziers[2][n]
        let p3 = beziers[3][n]
        let bezier_points = get_bezier_positions(p0, p1, p2, p3)
        let last_pos = p0
        let limit = 0.15
        points[index] = p0
        index++;
        for (let i = 1; i < 100; i++) {
            let pos = bezier_points[i - 1]
            let next_pos = bezier_points[i]
            if (is_within(pos, last_pos, limit) && !is_within(next_pos, last_pos, limit)) {
                last_pos = pos
                points[index] = pos
                index++;
            }
        }
    }
    return points;
}

